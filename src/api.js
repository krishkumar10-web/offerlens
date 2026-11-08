/**
 * OfferLens - API Service (src/api.js)
 *
 * Real flow:
 *   1. Extract text from the uploaded PDF using pdf.js (in-browser).
 *   2. POST {text, language} to the Supabase Edge Function "analyze".
 *   3. The Edge Function calls Gemini with the text and returns structured JSON.
 *   4. Show exactly what Gemini returns. Never fall back to mock data silently.
 *
 * Demo flow (behind explicit "Demo" presets):
 *   Uses mock data from mockResult.js — only triggered by options.useDemo.
 */

import * as pdfjsLib from 'pdfjs-dist';
import {
  mockOfferResultEn,
  mockOfferResultHi,
  mockCleanOfferResultEn,
  mockCleanOfferResultHi,
  ERROR_TYPES
} from './mockResult';
import { saveOfferAnalysis } from './supabaseClient';

// Configure pdf.js worker — use the bundled worker from the installed package
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://lxdyhbigyhlprmhoicho.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4ZHloYmlneWhscHJtaG9pY2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQxNDM0MzQsImV4cCI6MjEwOTcxOTQzNH0.snzHz11JzHscG4P9zZ1bUAAOEemsse5VbfCJ9D8i3v8';

/**
 * Extracts all text from a PDF File object using pdf.js.
 * Replaces "■" with "₹" (common font encoding issue in Indian offer letters).
 *
 * @param {File} file - The PDF file
 * @returns {Promise<string>} - The extracted text
 */
async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(' ');
    pages.push(pageText);
  }

  let fullText = pages.join('\n\n');

  // Fix common encoding: ■ is often the ₹ symbol in Indian PDFs
  fullText = fullText.replace(/■/g, '₹');

  return fullText;
}

/**
 * Calls the Supabase Edge Function "analyze" with the extracted text.
 *
 * @param {string} text - Extracted offer letter text
 * @param {string} language - 'en' or 'hi'
 * @returns {Promise<object>} - Structured analysis result from Gemini
 */
async function callAnalyzeEdgeFunction(text, language) {
  const url = `${SUPABASE_URL}/functions/v1/analyze`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ text, language }),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.error || `Edge Function returned ${response.status}`);
    error.code = ERROR_TYPES.SERVER_ERROR;
    throw error;
  }

  // Validate the response has the minimum expected shape
  if (!data.overview || !data.salary) {
    const error = new Error('The AI returned an incomplete analysis. Please try again.');
    error.code = ERROR_TYPES.SERVER_ERROR;
    throw error;
  }

  return data;
}

/**
 * Analyzes an uploaded offer letter — REAL flow.
 *
 * @param {File} offerInput - The PDF File object
 * @param {string} language - 'en' or 'hi'
 * @param {object} options - { useDemo, forceCleanOffer, simulateError }
 * @returns {Promise<object>} The structured analysis result
 * @throws {Error} Error with a .code matching ERROR_TYPES
 */
export async function analyzeOffer(offerInput, language = 'en', options = {}) {
  // ── Demo mode: only used when explicitly requested via preset buttons ──
  if (options.useDemo) {
    await new Promise((r) => setTimeout(r, 1500));

    if (options.simulateError) {
      const error = new Error(`Demo error: ${options.simulateError}`);
      error.code = options.simulateError;
      throw error;
    }

    if (options.forceCleanOffer) {
      return language === 'hi' ? mockCleanOfferResultHi : mockCleanOfferResultEn;
    }

    return language === 'hi' ? mockOfferResultHi : mockOfferResultEn;
  }

  // ── Real flow ──

  // 1. Client-side file validation
  const fileSize = offerInput?.size || 0;
  if (fileSize > 10 * 1024 * 1024) {
    const error = new Error('File exceeds 10 MB limit');
    error.code = ERROR_TYPES.FILE_TOO_LARGE;
    throw error;
  }

  // 2. Extract text from PDF in the browser
  let extractedText;
  try {
    extractedText = await extractTextFromPdf(offerInput);
  } catch (pdfErr) {
    console.error('PDF extraction failed:', pdfErr);
    const error = new Error('Could not read this PDF. It may be corrupted, password-protected, or a scanned image.');
    error.code = ERROR_TYPES.UNREADABLE_PDF;
    throw error;
  }

  // 3. Check if extracted text is usable
  const cleanedText = extractedText.replace(/\s+/g, ' ').trim();
  if (cleanedText.length < 50) {
    const error = new Error('This PDF has almost no readable text. It may be a scanned image or photo. Please upload a text-based PDF.');
    error.code = ERROR_TYPES.SCANNED_PDF;
    throw error;
  }

  // 4. Call the Edge Function (Gemini)
  const result = await callAnalyzeEdgeFunction(cleanedText, language);

  // 5. Log analysis to Supabase (fire-and-forget)
  saveOfferAnalysis({
    file_name: offerInput.name || 'uploaded_offer.pdf',
    file_size_kb: Math.round(fileSize / 1024),
    language,
    candidate_name: result.overview?.candidateName || 'Unknown',
    role: result.overview?.role || 'Unknown',
    company_name: result.overview?.company || 'Unknown',
    work_location: result.overview?.workLocation || 'India',
    annual_ctc: result.salary?.annualCtc || '—',
    monthly_in_hand: result.salary?.estimatedMonthlyInHand || '—',
    red_flags_count: result.redFlags ? result.redFlags.length : 0,
    status: 'completed',
    raw_result: result,
  }).catch((err) => {
    console.warn('Background Supabase logging error:', err);
  });

  return result;
}
