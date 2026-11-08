import React, { useState } from 'react';
import { 
  MessageSquareText, Send, CheckCircle2, AlertCircle, 
  Building2, Mail, User, Phone, Sparkles, Database, HelpCircle 
} from 'lucide-react';
import { uiText } from '../translations';
import { submitInquiry } from '../supabaseClient';

/**
 * Inquiry & Contact Section:
 * Allows candidates to submit questions or inquiries regarding offer letters, bonds, or compensation.
 * Directly persists all submissions into the Supabase 'inquiries' table.
 */
export default function InquirySection({ language, defaultCompany = '' }) {
  const t = uiText[language].inquiry;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    offerCompany: defaultCompany || '',
    subject: t.subjectOptions[0] || 'Offer Letter Red-Flag Clarification',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedId, setSubmittedId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    // Basic frontend validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage(language === 'hi' ? 'कृपया सभी आवश्यक फ़ील्ड भरें।' : 'Please fill in all required fields.');
      return;
    }

    try {
      await submitInquiry({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject,
        message: formData.message.trim(),
        offerCompany: formData.offerCompany.trim(),
        language: language
      });

      setStatus('success');
    } catch (err) {
      console.error('Submission failed:', err);
      setStatus('error');
      setErrorMessage(err.message || t.errorMsg);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      offerCompany: defaultCompany || '',
      subject: t.subjectOptions[0] || 'Offer Letter Red-Flag Clarification',
      message: ''
    });
    setStatus('idle');
    setErrorMessage('');
    setSubmittedId(null);
  };

  return (
    <section id="inquiry" className="py-16 md:py-24 bg-[#F2F5F7] border-t border-[#17212B]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7F3F2] border border-[#9DD0CC]/60 text-[#0E6F68] text-xs font-semibold">
            <MessageSquareText className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.badge}</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#17212B]">
            {t.title}
          </h2>

          <p className="text-sm sm:text-base text-[#5B6773] leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#17212B]/10 p-6 sm:p-10 relative overflow-hidden">
          
          {/* Supabase backend status pill badge */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#17212B]/10 text-xs text-[#5B6773]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-medium text-[#17212B]">{t.backendNote}</span>
            </div>
            <span className="text-[11px] bg-[#E7F3F2] text-[#0E6F68] font-semibold px-2.5 py-0.5 rounded-md">
              PostgreSQL
            </span>
          </div>

          {status === 'success' ? (
            /* Success Feedback View */
            <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-2xl bg-[#E7F3F2] text-[#0E6F68] flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <h3 className="font-heading text-xl font-bold text-[#17212B]">
                  {t.successTitle}
                </h3>
                <p className="text-sm text-[#5B6773] max-w-md mx-auto leading-relaxed">
                  {t.successMsg}
                </p>
              </div>

              {submittedId && (
                <div className="inline-block p-3 bg-[#F2F5F7] rounded-xl border border-[#17212B]/10 text-xs font-mono text-[#5B6773]">
                  Inquiry Ref: <span className="text-[#0E6F68] font-semibold">{submittedId}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0E6F68] hover:bg-[#0a5751] text-white text-sm font-semibold transition-all cursor-pointer shadow-sm"
                >
                  <MessageSquareText className="w-4 h-4" />
                  <span>{t.submitAnother}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {status === 'error' && errorMessage && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-800 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                
                {/* Full Name */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold text-[#17212B] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#0E6F68]" />
                    <span>{t.nameLabel} <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.namePlaceholder}
                    disabled={status === 'loading'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#17212B]/15 bg-white text-sm text-[#17212B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0E6F68] focus:border-transparent transition-all"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold text-[#17212B] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#0E6F68]" />
                    <span>{t.emailLabel} <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.emailPlaceholder}
                    disabled={status === 'loading'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#17212B]/15 bg-white text-sm text-[#17212B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0E6F68] focus:border-transparent transition-all"
                  />
                </div>

                {/* WhatsApp / Phone */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold text-[#17212B] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#0E6F68]" />
                    <span>{t.phoneLabel}</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.phonePlaceholder}
                    disabled={status === 'loading'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#17212B]/15 bg-white text-sm text-[#17212B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0E6F68] focus:border-transparent transition-all"
                  />
                </div>

                {/* Company in Offer */}
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-semibold text-[#17212B] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#0E6F68]" />
                    <span>{t.companyLabel}</span>
                  </label>
                  <input
                    type="text"
                    name="offerCompany"
                    value={formData.offerCompany}
                    onChange={handleChange}
                    placeholder={t.companyPlaceholder}
                    disabled={status === 'loading'}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#17212B]/15 bg-white text-sm text-[#17212B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0E6F68] focus:border-transparent transition-all"
                  />
                </div>

              </div>

              {/* Inquiry Topic Dropdown */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-semibold text-[#17212B] flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#0E6F68]" />
                  <span>{t.subjectLabel}</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#17212B]/15 bg-white text-sm text-[#17212B] focus:outline-none focus:ring-2 focus:ring-[#0E6F68] focus:border-transparent transition-all cursor-pointer"
                >
                  {t.subjectOptions.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message Details */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-semibold text-[#17212B] flex items-center gap-1.5">
                  <MessageSquareText className="w-3.5 h-3.5 text-[#0E6F68]" />
                  <span>{t.messageLabel} <span className="text-red-500">*</span></span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.messagePlaceholder}
                  disabled={status === 'loading'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#17212B]/15 bg-white text-sm text-[#17212B] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0E6F68] focus:border-transparent transition-all resize-y"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#5B6773] text-center sm:text-left">
                  🔒 Data is encrypted and securely saved into Supabase.
                </p>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-sm text-white transition-all shadow-sm ${
                    status === 'loading'
                      ? 'bg-[#0E6F68]/70 cursor-not-allowed'
                      : 'bg-[#0E6F68] hover:bg-[#0a5751] hover:shadow cursor-pointer'
                  }`}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{t.submittingBtn}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.submitBtn}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
