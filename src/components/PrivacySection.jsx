import React from 'react';
import { Lock, EyeOff, ShieldAlert } from 'lucide-react';
import { uiText } from '../translations';

/**
 * Privacy guarantee section establishing trust and confidentiality.
 */
export default function PrivacySection({ language }) {
  const t = uiText[language].privacy;

  return (
    <section id="privacy" className="py-16 md:py-24 bg-white border-t border-[#17212B]/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Box */}
        <div className="bg-[#E7F3F2]/60 rounded-xl p-8 sm:p-12 border border-[#9DD0CC]/60 text-left relative overflow-hidden">
          
          {/* Decorative background watermark */}
          <div className="absolute right-0 top-0 bottom-0 opacity-5 pointer-events-none flex items-center pr-6">
            <Lock className="w-64 h-64 text-[#0E6F68]" />
          </div>

          <div className="relative z-10 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E6F68] text-white text-xs font-semibold tracking-wide">
              <Lock className="w-3.5 h-3.5" aria-hidden="true" />
              {t.badge}
            </span>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#17212B]">
              {t.title}
            </h2>

            <p className="text-sm sm:text-base text-[#5B6773] max-w-2xl leading-relaxed">
              {t.desc}
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-[#9DD0CC]/40 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#E7F3F2] text-[#0E6F68] flex items-center justify-center mb-2">
                  <EyeOff className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-[#17212B]">{t.point1}</p>
              </div>

              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-[#9DD0CC]/40 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#E7F3F2] text-[#0E6F68] flex items-center justify-center mb-2">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-[#17212B]">{t.point2}</p>
              </div>

              <div className="bg-white/90 backdrop-blur-xs p-4 rounded-xl border border-[#9DD0CC]/40 shadow-xs">
                <div className="w-8 h-8 rounded-lg bg-[#E7F3F2] text-[#0E6F68] flex items-center justify-center mb-2">
                  <Lock className="w-4 h-4" />
                </div>
                <p className="text-xs font-semibold text-[#17212B]">{t.point3}</p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
