import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import FeatureCards from './components/FeatureCards';
import PrivacySection from './components/PrivacySection';
import InquirySection from './components/InquirySection';
import UploadSection from './components/UploadSection';
import LoadingState from './components/LoadingState';
import ResultsPage from './components/ResultsPage';
import ErrorState from './components/ErrorState';
import Footer from './components/Footer';

import { analyzeOffer } from './api';
import { ERROR_TYPES } from './mockResult';

/**
 * Main application component coordinating navigation, views, language, and API workflow.
 */
export default function App() {
  // Current UI Language ('en' for English or 'hi' for हिन्दी)
  const [language, setLanguage] = useState('en');

  // Active view: 'landing' | 'loading' | 'results' | 'error'
  const [view, setView] = useState('landing');

  // Holds structured offer data returned by analyzeOffer()
  const [resultData, setResultData] = useState(null);

  // Holds error code if analysis fails
  const [errorCode, setErrorCode] = useState(null);

  // Holds error message for display
  const [errorMessage, setErrorMessage] = useState('');

  /**
   * Triggers the offer analysis via the central api.js service.
   */
  const handleAnalyze = async (fileOrData, targetLanguage, options = {}) => {
    setView('loading');
    setErrorCode(null);
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      // Call the centralized API function (real Gemini call or demo mode)
      const data = await analyzeOffer(fileOrData, targetLanguage, options);
      setResultData(data);
      setView('results');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.warn("OfferLens analysis error:", err);
      setErrorCode(err.code || ERROR_TYPES.SERVER_ERROR);
      setErrorMessage(err.message || '');
      setView('error');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Updates language. For real results, we keep the same data —
   * the user can re-analyze in a different language if needed.
   */
  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    // Note: real results are in the language they were analyzed in.
    // Switching language here only changes UI labels, not the analysis text.
  };

  /**
   * Resets the application back to the initial landing/upload state.
   */
  const handleReset = () => {
    setView('landing');
    setResultData(null);
    setErrorCode(null);
    setErrorMessage('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Scrolls or focuses on the upload section when CTA is clicked.
   */
  const handleCtaClick = () => {
    if (view !== 'landing') {
      setView('landing');
      setTimeout(() => {
        const el = document.getElementById('upload-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.getElementById('upload-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F5F7] text-[#17212B] font-body selection:bg-[#0E6F68]/20 selection:text-[#0E6F68]">
      
      {/* Persistent Navigation Bar */}
      <Navbar
        language={language}
        setLanguage={handleLanguageChange}
        onNavigateToUpload={handleCtaClick}
        activeSection={view}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {view === 'landing' && (
          <>
            <Hero language={language} onCtaClick={handleCtaClick} />
            <UploadSection
              language={language}
              setLanguage={handleLanguageChange}
              onAnalyze={handleAnalyze}
              isLoading={false}
            />
            <HowItWorks language={language} />
            <FeatureCards language={language} />
            <PrivacySection language={language} />
            <InquirySection language={language} />
          </>
        )}

        {view === 'loading' && (
          <LoadingState language={language} />
        )}

        {view === 'results' && (
          <ResultsPage
            resultData={resultData}
            language={language}
            setLanguage={handleLanguageChange}
            onReset={handleReset}
          />
        )}

        {view === 'error' && (
          <ErrorState
            errorCode={errorCode}
            errorMessage={errorMessage}
            language={language}
            onRetry={handleReset}
          />
        )}
      </main>

      {/* Persistent Footer */}
      <Footer language={language} />

    </div>
  );
}
