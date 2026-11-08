import React from 'react';
import { 
  Building2, MapPin, Calendar, Briefcase, User, 
  IndianRupee, ShieldCheck, HeartPulse, CalendarCheck, 
  GraduationCap, Laptop, Coffee, AlertTriangle, AlertCircle, 
  CheckCircle2, ArrowLeft, RefreshCw, FileText, Info, ShieldAlert,
  HelpCircle, Sparkles
} from 'lucide-react';
import { uiText } from '../translations';
import InquirySection from './InquirySection';

/**
 * Icon mapper for benefits section.
 */
function BenefitIcon({ name }) {
  const iconProps = { className: "w-5 h-5 text-[#0E6F68]" };
  switch (name) {
    case 'ShieldAlert':
    case 'health':
      return <ShieldCheck {...iconProps} />;
    case 'CalendarCheck':
    case 'leave':
      return <CalendarCheck {...iconProps} />;
    case 'GraduationCap':
    case 'learning':
      return <GraduationCap {...iconProps} />;
    case 'Laptop':
    case 'wfh':
      return <Laptop {...iconProps} />;
    case 'HeartPulse':
    case 'wellness':
      return <HeartPulse {...iconProps} />;
    case 'Coffee':
    case 'food':
      return <Coffee {...iconProps} />;
    default:
      return <Sparkles {...iconProps} />;
  }
}

/**
 * Results Page: Comprehensive one-page breakdown with Overview, Salary & In-Hand Pay,
 * Benefits, Key Terms two-column table, Red Flags, Disclaimer, and "Analyze another letter".
 */
export default function ResultsPage({
  resultData,
  language,
  setLanguage,
  onReset
}) {
  const t = uiText[language].results;

  // Safeguard against missing data
  if (!resultData) return null;

  const { overview, salary, benefits = [], keyTerms = [], redFlags = [] } = resultData;

  return (
    <div className="py-10 md:py-16 bg-[#F2F5F7] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Action Bar: Back/Reset Button & In-Page Language Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#17212B]/10">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0E6F68] hover:text-[#0a5751] transition-colors cursor-pointer self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F68] rounded-md px-1 py-0.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.analyzeAnother}</span>
          </button>

          {/* Language Toggle for instant comparison */}
          <div className="flex items-center gap-2 self-start sm:self-auto bg-white p-1 rounded-xl border border-[#17212B]/10 shadow-xs">
            <span className="text-xs font-medium text-[#5B6773] px-2">Language:</span>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-[#0E6F68] text-white shadow-xs'
                  : 'text-[#5B6773] hover:text-[#17212B]'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                language === 'hi'
                  ? 'bg-[#0E6F68] text-white shadow-xs'
                  : 'text-[#5B6773] hover:text-[#17212B]'
              }`}
            >
              हिन्दी (Hindi)
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div>
          <h1 className="font-heading text-2xl sm:text-4xl font-bold text-[#17212B] tracking-tight">
            {t.pageTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#5B6773] mt-1.5">
            {t.pageSubtitle}
          </p>
        </div>

        {/* ========================================================
            CARD 1: OVERVIEW CARD
           ======================================================== */}
        <section aria-labelledby="overview-heading" className="bg-white rounded-xl shadow-xs border border-[#17212B]/10 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#17212B]/10 mb-6">
            <Building2 className="w-5 h-5 text-[#0E6F68]" aria-hidden="true" />
            <h2 id="overview-heading" className="font-heading text-xl sm:text-2xl font-bold text-[#17212B]">
              {t.overviewTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-xs font-medium text-[#5B6773] uppercase tracking-wider">{t.candidate}</p>
              <p className="text-base font-semibold text-[#17212B] mt-0.5">{overview.candidateName || "—"}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#5B6773] uppercase tracking-wider">{t.role}</p>
              <p className="text-base font-semibold text-[#0E6F68] mt-0.5">{overview.role || "—"}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#5B6773] uppercase tracking-wider">{t.company}</p>
              <p className="text-base font-semibold text-[#17212B] mt-0.5">{overview.company || "—"}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#5B6773] uppercase tracking-wider">{t.location}</p>
              <p className="text-sm font-medium text-[#17212B] mt-0.5">{overview.workLocation || "—"}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#5B6773] uppercase tracking-wider">{t.joiningDate}</p>
              <p className="text-sm font-medium text-[#17212B] mt-0.5">{overview.joiningDate || "—"}</p>
            </div>

            <div>
              <p className="text-xs font-medium text-[#5B6773] uppercase tracking-wider">{t.empType}</p>
              <p className="text-sm font-medium text-[#17212B] mt-0.5">{overview.employmentType || "—"}</p>
            </div>
          </div>

          {/* Plain-Language Executive Summary Box */}
          <div className="p-4 rounded-xl bg-[#F2F5F7] border border-[#17212B]/5 text-sm text-[#17212B] leading-relaxed">
            <span className="font-semibold text-[#0E6F68] block mb-1">
              {language === 'hi' ? 'त्वरित सारांश:' : 'Quick Summary:'}
            </span>
            <p>{overview.summary}</p>
          </div>
        </section>

        {/* ========================================================
            CARD 2: SALARY & MONTHLY IN-HAND CARD
           ======================================================== */}
        <section aria-labelledby="salary-heading" className="bg-white rounded-xl shadow-xs border border-[#17212B]/10 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#17212B]/10 mb-6">
            <IndianRupee className="w-5 h-5 text-[#0E6F68]" aria-hidden="true" />
            <h2 id="salary-heading" className="font-heading text-xl sm:text-2xl font-bold text-[#17212B]">
              {t.salaryTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mb-8">
            {/* CTC Overview Stats */}
            <div className="md:col-span-5 p-6 rounded-xl bg-[#F2F5F7] border border-[#17212B]/5 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5B6773]">
                  {t.annualCtcLabel}
                </p>
                <p className="font-heading text-3xl sm:text-4xl font-bold text-[#17212B] mt-1">
                  {salary.annualCtc}
                </p>
                <p className="text-xs text-[#5B6773] mt-1">
                  {t.monthlyGrossLabel}: <span className="font-semibold text-[#17212B]">{salary.monthlyGross}</span>
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#17212B]/10 text-xs text-[#5B6773]">
                <span>Cost To Company includes basic, allowances, and statutory employer benefits.</span>
              </div>
            </div>

            {/* HIGHLIGHTED TEAL BOX: Estimated Monthly In-Hand */}
            <div className="md:col-span-7 bg-[#E7F3F2] rounded-xl p-6 sm:p-8 border-2 border-[#0E6F68] relative flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#0E6F68] bg-white px-2.5 py-1 rounded-full shadow-2xs">
                    {t.inHandBadge}
                  </span>
                  <span className="text-xs font-medium text-[#0E6F68]">Direct Bank Credit</span>
                </div>

                <div className="my-4">
                  <p className="font-heading text-4xl sm:text-5xl font-extrabold text-[#0E6F68]">
                    {salary.estimatedMonthlyInHand}
                  </p>
                  <p className="text-xs font-semibold text-[#0E6F68] mt-1">
                    {language === 'hi' ? 'प्रति माह अनुमानित' : 'per month estimated'}
                  </p>
                </div>
              </div>

              {/* Mandatory Note */}
              <div className="p-3 bg-white/80 backdrop-blur-xs rounded-lg border border-[#9DD0CC] text-xs text-[#17212B]">
                <span className="font-bold text-[#0E6F68]">{t.inHandNotePrefix} </span>
                <span>{salary.inHandNote}</span>
              </div>
            </div>
          </div>

          {/* Component Breakdown Table */}
          <div>
            <h3 className="font-heading text-lg font-bold text-[#17212B] mb-3">
              {t.breakdownHeading}
            </h3>
            
            <div className="overflow-x-auto rounded-xl border border-[#17212B]/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#F2F5F7] text-[#5B6773] font-semibold border-b border-[#17212B]/10">
                  <tr>
                    <th scope="col" className="p-3.5 sm:px-6">Component</th>
                    <th scope="col" className="p-3.5 sm:px-6">Amount</th>
                    <th scope="col" className="p-3.5 sm:px-6">Percentage / Nature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#17212B]/5">
                  {salary.components.map((comp, idx) => (
                    <tr key={idx} className="hover:bg-[#F2F5F7]/40 transition-colors">
                      <td className="p-3.5 sm:px-6 font-medium text-[#17212B]">{comp.label}</td>
                      <td className="p-3.5 sm:px-6 font-semibold text-[#0E6F68]">{comp.amount}</td>
                      <td className="p-3.5 sm:px-6 text-xs text-[#5B6773]">{comp.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ========================================================
            CARD 3: BENEFITS AT A GLANCE (WITH ICONS)
           ======================================================== */}
        <section aria-labelledby="benefits-heading" className="bg-white rounded-xl shadow-xs border border-[#17212B]/10 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#17212B]/10 mb-6">
            <HeartPulse className="w-5 h-5 text-[#0E6F68]" aria-hidden="true" />
            <h2 id="benefits-heading" className="font-heading text-xl sm:text-2xl font-bold text-[#17212B]">
              {t.benefitsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((benefit) => (
              <div 
                key={benefit.id} 
                className="p-5 rounded-xl bg-[#F2F5F7] border border-[#17212B]/5 flex items-start gap-4 hover:border-[#0E6F68]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-2xs border border-[#17212B]/5">
                  <BenefitIcon name={benefit.icon} />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-[#17212B]">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-[#5B6773] mt-1 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================
            CARD 4: KEY TERMS (TWO-COLUMN TABLE)
           ======================================================== */}
        <section aria-labelledby="key-terms-heading" className="bg-white rounded-xl shadow-xs border border-[#17212B]/10 p-6 sm:p-8">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#17212B]/10 mb-6">
            <FileText className="w-5 h-5 text-[#0E6F68]" aria-hidden="true" />
            <h2 id="key-terms-heading" className="font-heading text-xl sm:text-2xl font-bold text-[#17212B]">
              {t.keyTermsTitle}
            </h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#17212B]/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#F2F5F7] text-[#5B6773] font-semibold border-b border-[#17212B]/10">
                <tr>
                  <th scope="col" className="p-4 sm:px-6 w-1/3 sm:w-2/5">{t.termHeader}</th>
                  <th scope="col" className="p-4 sm:px-6 w-2/3 sm:w-3/5">{t.valueHeader}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#17212B]/10">
                {keyTerms.map((item, index) => (
                  <tr key={index} className="hover:bg-[#F2F5F7]/30 transition-colors">
                    <td className="p-4 sm:px-6 font-semibold text-[#17212B] align-top bg-[#F2F5F7]/20">
                      {item.term}
                    </td>
                    <td className="p-4 sm:px-6 text-[#17212B] leading-relaxed align-top">
                      {item.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================
            CARD 5: RED-FLAGS CLAUSE DETECTOR
           ======================================================== */}
        <section aria-labelledby="red-flags-heading" className="bg-white rounded-xl shadow-xs border border-[#17212B]/10 p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#17212B]/10 mb-6 flex-wrap gap-2">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-[#B42318]" aria-hidden="true" />
              <div>
                <h2 id="red-flags-heading" className="font-heading text-xl sm:text-2xl font-bold text-[#17212B]">
                  {t.redFlagsTitle}
                </h2>
                <p className="text-xs text-[#5B6773] mt-0.5">{t.redFlagsSubtitle}</p>
              </div>
            </div>

            {redFlags.length > 0 && (
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FEE4E2] text-[#B42318]">
                {redFlags.length} {language === 'hi' ? 'चेतावनियाँ' : 'Flags Detected'}
              </span>
            )}
          </div>

          {/* Case A: Zero Red Flags Found (Friendly Message) */}
          {redFlags.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#E7F3F2]/50 border border-[#9DD0CC] text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#E7F3F2] text-[#0E6F68] mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading text-xl font-bold text-[#0E6F68]">
                {t.noRedFlagsTitle}
              </h3>
              <p className="text-sm text-[#5B6773] max-w-lg mx-auto">
                {t.noRedFlagsDesc}
              </p>
            </div>
          ) : (
            /* Case B: Red-Flag Cards with colored border, severity chip, plain explanation, and quoted clause */
            <div className="space-y-6">
              {redFlags.map((flag) => {
                const isHighRisk = flag.severity === 'high';
                const borderColor = isHighRisk ? 'border-l-[#B42318]' : 'border-l-[#9A5B00]';
                const chipBg = isHighRisk ? 'bg-[#FEE4E2] text-[#B42318]' : 'bg-[#FEF0C7] text-[#9A5B00]';

                return (
                  <div
                    key={flag.id}
                    className={`p-6 rounded-xl bg-white border border-[#17212B]/10 border-l-4 ${borderColor} shadow-xs space-y-4`}
                  >
                    {/* Header with Title and Severity Chip */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h3 className="font-heading text-lg font-bold text-[#17212B]">
                        {flag.title}
                      </h3>
                      <div className="self-start sm:self-auto">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold ${chipBg}`}>
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>{flag.severityLabel}</span>
                        </span>
                      </div>
                    </div>

                    {/* Plain Explanation */}
                    <div>
                      <p className="text-xs font-semibold text-[#5B6773] uppercase tracking-wider mb-1">
                        {t.plainExplanationLabel}
                      </p>
                      <p className="text-sm sm:text-base text-[#17212B] leading-relaxed">
                        {flag.explanation}
                      </p>
                    </div>

                    {/* Quoted Original Clause in Small Gray Box */}
                    <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 text-xs text-[#5B6773] font-mono leading-relaxed">
                      <p className="text-[11px] font-bold text-[#17212B] font-sans mb-1">
                        {t.clauseQuoteLabel}
                      </p>
                      <blockquote className="italic">
                        "{flag.clauseQuote}"
                      </blockquote>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ========================================================
            CARD 6: MANDATORY DISCLAIMER
           ======================================================== */}
        <section aria-labelledby="disclaimer-heading" className="bg-white rounded-xl shadow-xs border border-[#17212B]/10 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-[#9A5B00] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 id="disclaimer-heading" className="font-heading text-base font-bold text-[#17212B]">
                {t.disclaimerTitle}
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6773] mt-1 leading-relaxed">
                {t.disclaimerText}
              </p>
            </div>
          </div>
        </section>

        {/* Candidate Inquiry & Doubt Resolution Form */}
        <InquirySection 
          language={language} 
          defaultCompany={overview?.company || ''} 
        />

        {/* Bottom CTA to Analyze Another Offer */}
        <div className="text-center pt-4 pb-12">
          <button
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-[#0E6F68] hover:bg-[#0a5751] transition-all shadow-md hover:shadow-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F68] focus-visible:ring-offset-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>{t.analyzeAnother}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
