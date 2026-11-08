import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { uiText } from '../translations';

/**
 * Hero section with bold serif headline, supporting text, CTA button,
 * and a 3D media area supporting <video> with poster and graceful gradient placeholder fallback.
 */
export default function Hero({ language, onCtaClick }) {
  const t = uiText[language].hero;
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline and Call-to-Action */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E7F3F2] border border-[#9DD0CC]/60 text-[#0E6F68] text-xs sm:text-sm font-medium">
              <Sparkles className="w-4 h-4 text-[#0E6F68]" aria-hidden="true" />
              <span>{t.featureBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-3xl sm:text-5xl lg:text-5xl/tight font-bold text-[#17212B] tracking-tight">
              {t.headline}
            </h1>

            {/* Supporting Line */}
            <p className="text-base sm:text-lg text-[#5B6773] max-w-xl leading-relaxed">
              {t.subline}
            </p>

            {/* CTA Button Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onCtaClick}
                className="inline-flex items-center justify-center gap-3 px-6 py-3.5 text-base font-semibold text-white bg-[#0E6F68] hover:bg-[#0a5751] rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F68] focus-visible:ring-offset-2"
              >
                <span>{t.ctaButton}</span>
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-2 text-xs font-medium text-[#5B6773] px-1">
                <ShieldCheck className="w-4 h-4 text-[#0E6F68]" aria-hidden="true" />
                <span>Private & safe: No data storage</span>
              </div>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-[#17212B]/10 grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <p className="text-xl font-bold text-[#17212B]">100%</p>
                <p className="text-xs text-[#5B6773]">Private & In-Memory</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#0E6F68]">₹ In-Hand</p>
                <p className="text-xs text-[#5B6773]">Real Monthly Pay</p>
              </div>
              <div>
                <p className="text-xl font-bold text-[#B42318]">Red Flags</p>
                <p className="text-xs text-[#5B6773]">Bonds & Clauses</p>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Media Area with Video and Soft Teal Gradient Fallback */}
          <div className="lg:col-span-5 relative">
            
            {/* Soft decorative background glow */}
            <div className="absolute -inset-2 bg-gradient-to-tr from-[#0E6F68]/20 via-[#0E6F68]/5 to-transparent rounded-2xl blur-xl -z-10" />

            {/* Rounded media container (12px rounded corners + soft shadow) */}
            <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-xl overflow-hidden shadow-md border border-[#17212B]/10 bg-white">
              
              {/* Attempt to load HTML5 Video from /hero/hero.mp4 with poster /hero/hero.jpg */}
              {!videoFailed ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/hero/hero.jpg"
                  onError={() => setVideoFailed(true)}
                  className="w-full h-full object-cover"
                >
                  <source src="/hero/hero.mp4" type="video/mp4" />
                  {/* Fallback inside video tag if browser doesn't support video */}
                  Your browser does not support the video tag.
                </video>
              ) : null}

              {/* Soft Teal Gradient Placeholder (Shown if files are missing or while loading) */}
              {videoFailed && (
                <div 
                  className="w-full h-full bg-gradient-to-br from-[#E7F3F2] via-[#F2F5F7] to-[#D5ECE9] p-6 flex flex-col justify-between"
                  role="img"
                  aria-label="Interactive 3D preview of OfferLens analyzing an offer letter"
                >
                  {/* Top Bar Preview */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#0E6F68]/20 text-xs font-semibold text-[#0E6F68] shadow-xs">
                      <FileText className="w-4 h-4" />
                      <span>Offer Letter 2025.pdf</span>
                    </div>
                    <span className="text-[11px] font-semibold tracking-wider uppercase text-[#0E6F68] bg-[#0E6F68]/10 px-2 py-0.5 rounded-full">
                      Live AI Scan
                    </span>
                  </div>

                  {/* Centered 3D Card Illusion */}
                  <div className="space-y-3 py-4">
                    {/* Floating Salary Pill */}
                    <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#17212B]/5 flex items-center justify-between transform transition-transform hover:scale-102">
                      <div>
                        <p className="text-xs text-[#5B6773]">Calculated In-Hand Pay</p>
                        <p className="text-xl font-bold text-[#0E6F68]">₹ 59,200 <span className="text-xs font-normal text-[#5B6773]">/month</span></p>
                      </div>
                      <div className="w-9 h-9 rounded-lg bg-[#E7F3F2] flex items-center justify-center text-[#0E6F68]">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Floating Red-Flag Warning Badge */}
                    <div className="bg-white rounded-xl p-3.5 shadow-sm border-l-4 border-l-[#B42318] border border-[#17212B]/5 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#FEE4E2] flex items-center justify-center text-[#B42318] shrink-0 mt-0.5">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-xs font-bold text-[#17212B]">2-Year Service Bond Found</p>
                          <span className="bg-[#FEE4E2] text-[#B42318] text-[10px] font-bold px-1.5 py-0.5 rounded">High Risk</span>
                        </div>
                        <p className="text-[11px] text-[#5B6773] mt-0.5 leading-snug">
                          Penalty of ₹1,50,000 if you exit within 24 months.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Caption */}
                  <div className="text-center bg-white/60 backdrop-blur-xs py-2 px-3 rounded-lg border border-white/60">
                    <p className="text-xs font-medium text-[#17212B]">
                      Drop your file into OfferLens to get your breakdown
                    </p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
