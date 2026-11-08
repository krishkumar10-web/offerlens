import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, X, AlertCircle, Check, ShieldCheck, Languages } from 'lucide-react';
import { uiText } from '../translations';
import { ERROR_TYPES } from '../mockResult';

/**
 * Upload screen / section featuring drag-and-drop PDF dropzone,
 * traditional file browse button, English/Hindi selector, validation,
 * privacy badge, and quick test presets.
 */
export default function UploadSection({
  language,
  setLanguage,
  onAnalyze,
  isLoading
}) {
  const t = uiText[language].upload;
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  // Validates file format and size
  const validateAndSetFile = (file) => {
    setValidationError('');

    if (!file) return;

    // Check file extension / MIME type (PDF only)
    const isPdf = file.name.toLowerCase().endsWith('.pdf') || file.type === 'application/pdf';
    if (!isPdf) {
      setValidationError(t.errorPdfOnly);
      setSelectedFile(null);
      return;
    }

    // Check file size (max 10 MB = 10 * 1024 * 1024 bytes)
    const maxSizeBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setValidationError(t.errorMax10Mb);
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  // Drag and drop event handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  // Standard input file change
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setValidationError(language === 'hi' ? 'कृपया आगे बढ़ने से पहले एक पीडीएफ फ़ाइल चुनें।' : 'Please select a PDF file before proceeding.');
      return;
    }
    onAnalyze(selectedFile, language);
  };

  // Trigger quick test scenarios for the reviewer/beginner
  const handleTestPreset = (presetType) => {
    setValidationError('');
    let mockFile;

    switch (presetType) {
      case 'CLEAN':
        mockFile = new File(["dummy clean offer text"], "fairwork_clean_offer.pdf", { type: "application/pdf" });
        setSelectedFile(mockFile);
        onAnalyze(mockFile, language, { forceCleanOffer: true });
        break;
      case 'SCAN_ERR':
        mockFile = new File(["dummy scan"], "scanned_photo_offer.pdf", { type: "application/pdf" });
        setSelectedFile(mockFile);
        onAnalyze(mockFile, language, { simulateError: ERROR_TYPES.SCANNED_PDF });
        break;
      case 'LARGE_ERR':
        mockFile = new File(["dummy large"], "heavy_portfolio_15mb.pdf", { type: "application/pdf" });
        setSelectedFile(mockFile);
        onAnalyze(mockFile, language, { simulateError: ERROR_TYPES.FILE_TOO_LARGE });
        break;
      case 'CORRUPT_ERR':
        mockFile = new File(["corrupt"], "unreadable_corrupt.pdf", { type: "application/pdf" });
        setSelectedFile(mockFile);
        onAnalyze(mockFile, language, { simulateError: ERROR_TYPES.UNREADABLE_PDF });
        break;
      case 'SERVER_ERR':
        mockFile = new File(["error"], "server_error.pdf", { type: "application/pdf" });
        setSelectedFile(mockFile);
        onAnalyze(mockFile, language, { simulateError: ERROR_TYPES.SERVER_ERROR });
        break;
      default:
        // Standard realistic offer
        mockFile = new File(["dummy normal offer text"], "nexgen_fresher_offer.pdf", { type: "application/pdf" });
        setSelectedFile(mockFile);
        onAnalyze(mockFile, language);
        break;
    }
  };

  return (
    <section id="upload-section" className="py-12 md:py-20 bg-[#F2F5F7] scroll-mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Card Container (12px rounded corners + soft shadow) */}
        <div className="bg-white rounded-xl shadow-md border border-[#17212B]/10 p-6 sm:p-10">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#17212B]">
              {t.title}
            </h2>
            <p className="text-sm sm:text-base text-[#5B6773] mt-2">
              {t.subtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Drag & Drop Box */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-[#0E6F68] bg-[#E7F3F2]/50 scale-[1.01]'
                  : selectedFile
                  ? 'border-[#0E6F68]/80 bg-[#E7F3F2]/20'
                  : 'border-[#17212B]/20 hover:border-[#0E6F68]/60 bg-[#F2F5F7]/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
                id="offer-letter-input"
                aria-label="Upload PDF offer letter"
              />

              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#E7F3F2] text-[#0E6F68] flex items-center justify-center shadow-xs">
                  <UploadCloud className="w-8 h-8" aria-hidden="true" />
                </div>

                <div>
                  <p className="text-base font-bold text-[#17212B]">
                    {t.dropTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-[#5B6773] mt-1">
                    {t.dropSubtitle}
                  </p>
                </div>

                {/* Normal File Browse Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="mt-2 inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-[#0E6F68] bg-white border border-[#0E6F68]/40 hover:bg-[#E7F3F2] rounded-xl transition-colors cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F68]"
                >
                  <FileText className="w-4 h-4" />
                  <span>{t.browseButton}</span>
                </button>

                <p className="text-[11px] text-[#5B6773]">
                  PDF only • Max 10 MB
                </p>
              </div>
            </div>

            {/* Selected File Feedback Badge */}
            {selectedFile && (
              <div className="flex items-center justify-between p-3.5 bg-[#E7F3F2] rounded-xl border border-[#9DD0CC] text-sm">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <FileText className="w-5 h-5 text-[#0E6F68] shrink-0" />
                  <div className="truncate">
                    <p className="font-semibold text-[#17212B] truncate">{selectedFile.name}</p>
                    <p className="text-xs text-[#5B6773]">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB • PDF ready</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="p-1 text-[#5B6773] hover:text-[#B42318] rounded-md transition-colors cursor-pointer"
                  title={t.removeFile}
                  aria-label="Remove selected file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Validation Error Banner */}
            {validationError && (
              <div className="p-3.5 bg-[#FEE4E2] border border-[#FECDCA] rounded-xl flex items-start gap-2.5 text-sm text-[#B42318]">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Language Selection Toggle */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-[#F2F5F7] rounded-xl border border-[#17212B]/5">
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-[#0E6F68]" />
                <span className="text-sm font-semibold text-[#17212B]">
                  {t.languageLabel}
                </span>
              </div>

              <div className="flex items-center bg-white p-1 rounded-xl border border-[#17212B]/10">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-[#0E6F68] text-white shadow-xs'
                      : 'text-[#5B6773] hover:text-[#17212B]'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('hi')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    language === 'hi'
                      ? 'bg-[#0E6F68] text-white shadow-xs'
                      : 'text-[#5B6773] hover:text-[#17212B]'
                  }`}
                >
                  हिन्दी (Hindi)
                </button>
              </div>
            </div>

            {/* Main Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-xl text-base font-semibold text-white shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F68] focus-visible:ring-offset-2 ${
                isLoading
                  ? 'bg-[#0E6F68]/70 cursor-not-allowed opacity-80'
                  : 'bg-[#0E6F68] hover:bg-[#0a5751] hover:shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {isLoading ? t.analyzingButton : t.submitButton}
            </button>

            {/* Privacy Note */}
            <p className="text-center text-xs text-[#5B6773]">
              {t.privacyNote}
            </p>

            {/* Fast Test Presets Bar for Reviewers & Beginners */}
            <div className="pt-4 border-t border-[#17212B]/10">
              <p className="text-xs font-semibold text-[#5B6773] mb-2.5">
                {t.testOptionsTitle}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleTestPreset('NORMAL')}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#E7F3F2] text-[#0E6F68] hover:bg-[#0E6F68] hover:text-white transition-colors cursor-pointer"
                >
                  {t.presetNormal}
                </button>
                <button
                  type="button"
                  onClick={() => handleTestPreset('CLEAN')}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-green-50 text-green-700 hover:bg-green-700 hover:text-white transition-colors cursor-pointer border border-green-200"
                >
                  {t.presetClean}
                </button>
                <button
                  type="button"
                  onClick={() => handleTestPreset('SCAN_ERR')}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#FEF0C7] text-[#9A5B00] hover:bg-[#9A5B00] hover:text-white transition-colors cursor-pointer"
                >
                  {t.presetScanErr}
                </button>
                <button
                  type="button"
                  onClick={() => handleTestPreset('LARGE_ERR')}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#FEE4E2] text-[#B42318] hover:bg-[#B42318] hover:text-white transition-colors cursor-pointer"
                >
                  {t.presetLargeErr}
                </button>
                <button
                  type="button"
                  onClick={() => handleTestPreset('CORRUPT_ERR')}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-100 text-[#17212B] hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
                >
                  {t.presetCorruptErr}
                </button>
              </div>
            </div>

          </form>

        </div>

      </div>
    </section>
  );
}
