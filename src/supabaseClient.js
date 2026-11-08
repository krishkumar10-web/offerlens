import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lxdyhbigyhlprmhoicho.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4ZHloYmlneWhscHJtaG9pY2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQxNDM0MzQsImV4cCI6MjEwOTcxOTQzNH0.snzHz11JzHscG4P9zZ1bUAAOEemsse5VbfCJ9D8i3v8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Saves a candidate inquiry / contact form submission into Supabase.
 * 
 * @param {Object} inquiryData
 * @param {string} inquiryData.name - User's full name
 * @param {string} inquiryData.email - User's email address
 * @param {string} [inquiryData.phone] - User's phone number
 * @param {string} [inquiryData.subject] - Subject or query topic
 * @param {string} inquiryData.message - Detailed inquiry message or question
 * @param {string} [inquiryData.offerCompany] - Company name from offer letter
 * @param {string} [inquiryData.language] - Language code ('en' or 'hi')
 * @returns {Promise<{data: any, error: any}>}
 */
export async function submitInquiry({
  name,
  email,
  phone = '',
  subject = 'Offer Letter Question',
  message,
  offerCompany = '',
  language = 'en'
}) {
  const { error } = await supabase
    .from('inquiries')
    .insert([
      {
        name,
        email,
        phone: phone || null,
        subject: subject || 'Offer Letter Question',
        message,
        offer_company: offerCompany || null,
        language,
        status: 'pending'
      }
    ]);

  if (error) {
    console.error('Error submitting inquiry to Supabase:', error);
    throw error;
  }

  return { success: true };
}

/**
 * Saves an analyzed offer letter record into Supabase offer_analyses.
 * 
 * @param {Object} analysisRecord
 * @returns {Promise<{data: any, error: any}>}
 */
export async function saveOfferAnalysis(analysisRecord) {
  try {
    const { data, error } = await supabase
      .from('offer_analyses')
      .insert([analysisRecord])
      .select();

    if (error) {
      console.warn('Failed to record offer analysis in Supabase:', error.message);
      return null;
    }

    return data;
  } catch (err) {
    console.warn('Supabase offer_analyses insert exception:', err);
    return null;
  }
}
