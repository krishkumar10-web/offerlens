import React, { useState } from 'react';
import { FileSearch, Menu, X, Globe, ShieldCheck } from 'lucide-react';
import { uiText } from '../translations';

/**
 * Top navigation bar with logo, section links, language toggle, and "Try it now" action.
 */
export default function Navbar({ language, setLanguage, onNavigateToUpload, activeSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = uiText[language].nav;

  // Handles smooth scrolling to anchor sections or resetting view
  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      // If currently on results page and user clicks an anchor, go back to landing first
      onNavigateToUpload(false);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#17212B]/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Brand Logo */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            onNavigateToUpload(false);
          }}
          className="flex items-center gap-2.5 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F68] rounded-lg p-1"
          aria-label="OfferLens Home"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0E6F68] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <FileSearch className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <span className="font-heading text-xl font-bold tracking-tight text-[#17212B] block leading-none">
              Offer<span className="text-[#0E6F68]">Lens</span>
            </span>
            <span className="text-[11px] font-medium text-[#5B6773] tracking-wide block mt-0.5">
              Know Before You Sign
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          <button
            onClick={() => scrollTo('how-it-works')}
            className="text-[15px] font-medium text-[#5B6773] hover:text-[#0E6F68] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F68] rounded-md px-1 py-0.5"
          >
            {t.howItWorks}
          </button>
          <button
            onClick={() => scrollTo('features')}
            className="text-[15px] font-medium text-[#5B6773] hover:text-[#0E6F68] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F68] rounded-md px-1 py-0.5"
          >
            {t.features}
          </button>
          <button
            onClick={() => scrollTo('privacy')}
            className="text-[15px] font-medium text-[#5B6773] hover:text-[#0E6F68] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F68] rounded-md px-1 py-0.5 flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-[#0E6F68]" aria-hidden="true" />
            {t.privacy}
          </button>
          <button
            onClick={() => scrollTo('inquiry')}
            className="text-[15px] font-medium text-[#5B6773] hover:text-[#0E6F68] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F68] rounded-md px-1 py-0.5"
          >
            {t.inquiry}
          </button>
        </nav>

        {/* Action Controls & Language Selector */}
        <div className="hidden md:flex items-center gap-4">
          {/* Quick Bilingual Switcher */}
          <div className="flex items-center bg-[#F2F5F7] p-1 rounded-xl border border-[#17212B]/10">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-[#0E6F68] shadow-xs'
                  : 'text-[#5B6773] hover:text-[#17212B]'
              }`}
              aria-label="Switch to English"
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                language === 'hi'
                  ? 'bg-white text-[#0E6F68] shadow-xs'
                  : 'text-[#5B6773] hover:text-[#17212B]'
              }`}
              aria-label="Switch to Hindi"
            >
              हिन्दी
            </button>
          </div>

          {/* "Try it now" / "Upload Offer" CTA Button */}
          <button
            onClick={() => {
              onNavigateToUpload(true);
              const el = document.getElementById('upload-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-[#0E6F68] hover:bg-[#0a5751] rounded-xl transition-all shadow-xs hover:shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F68] focus-visible:ring-offset-2"
          >
            {t.tryNow}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Language Switcher */}
          <div className="flex items-center bg-[#F2F5F7] p-1 rounded-lg border border-[#17212B]/10 mr-1">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="px-2 py-0.5 text-xs font-medium text-[#0E6F68] flex items-center gap-1"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'HI' : 'EN'}</span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#17212B] hover:text-[#0E6F68] rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F68]"
            aria-label="Open mobile navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#17212B]/5 bg-white px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollTo('how-it-works')}
            className="block w-full text-left py-2 text-base font-medium text-[#17212B] hover:text-[#0E6F68]"
          >
            {t.howItWorks}
          </button>
          <button
            onClick={() => scrollTo('features')}
            className="block w-full text-left py-2 text-base font-medium text-[#17212B] hover:text-[#0E6F68]"
          >
            {t.features}
          </button>
          <button
            onClick={() => scrollTo('privacy')}
            className="block w-full text-left py-2 text-base font-medium text-[#17212B] hover:text-[#0E6F68]"
          >
            {t.privacy}
          </button>
          <button
            onClick={() => scrollTo('inquiry')}
            className="block w-full text-left py-2 text-base font-medium text-[#17212B] hover:text-[#0E6F68]"
          >
            {t.inquiry}
          </button>

          <div className="pt-2 border-t border-[#17212B]/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateToUpload(true);
                const el = document.getElementById('upload-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full text-center py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-[#0E6F68] hover:bg-[#0a5751] shadow-xs"
            >
              {t.tryNow}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
