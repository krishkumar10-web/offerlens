import React from 'react';
import { FileSearch, ShieldAlert } from 'lucide-react';
import { uiText } from '../translations';

/**
 * Site footer with the mandatory "AI summary, not legal advice" disclaimer.
 */
export default function Footer({ language }) {
  const t = uiText[language].footer;

  return (
    <footer className="bg-white border-t border-[#17212B]/10 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mandatory Legal Advice Notice Banner */}
        <div className="mb-8 p-4 rounded-xl bg-[#F2F5F7] border border-[#17212B]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-[#9A5B00] shrink-0" aria-hidden="true" />
            <p className="text-sm font-semibold text-[#17212B]">
              Notice: <span className="font-bold text-[#0E6F68]">{t.legalNote}</span>
            </p>
          </div>
          <p className="text-xs text-[#5B6773] max-w-md">
            OfferLens helps you understand common terminology and CTC components. It does not constitute formal legal counsel.
          </p>
        </div>

        {/* Brand and Copyright Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#17212B]/5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0E6F68] flex items-center justify-center text-white">
              <FileSearch className="w-4 h-4" />
            </div>
            <span className="font-heading font-bold text-base text-[#17212B]">OfferLens</span>
            <span className="text-xs text-[#5B6773] hidden sm:inline">— {t.tagline}</span>
          </div>

          <div className="text-xs text-[#5B6773] text-center sm:text-right space-y-1">
            <p>{t.copyright}</p>
            <p className="text-[#0E6F68] font-medium">{t.confidentiality}</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
