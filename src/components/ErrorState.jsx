import React from 'react';
import { AlertTriangle, FileX2, RefreshCw, FileQuestion, HardDrive } from 'lucide-react';
import { ERROR_MESSAGES, ERROR_TYPES } from '../mockResult';

/**
 * Standard error state presentation for scanned PDF, corrupt file, size limit, or unexpected failures.
 */
export default function ErrorState({ errorCode, language, onRetry }) {
  const langKey = language === 'hi' ? 'hi' : 'en';
  const errorInfo = ERROR_MESSAGES[langKey][errorCode] || ERROR_MESSAGES[langKey][ERROR_TYPES.SERVER_ERROR];

  // Pick appropriate icon based on error category
  const renderIcon = () => {
    switch (errorCode) {
      case ERROR_TYPES.SCANNED_PDF:
        return <FileQuestion className="w-8 h-8 text-[#9A5B00]" />;
      case ERROR_TYPES.FILE_TOO_LARGE:
        return <HardDrive className="w-8 h-8 text-[#B42318]" />;
      case ERROR_TYPES.UNREADABLE_PDF:
        return <FileX2 className="w-8 h-8 text-[#B42318]" />;
      default:
        return <AlertTriangle className="w-8 h-8 text-[#B42318]" />;
    }
  };

  const isWarningOnly = errorCode === ERROR_TYPES.SCANNED_PDF;

  return (
    <div className="py-12 md:py-20 max-w-xl mx-auto px-4 text-center">
      <div className="bg-white rounded-xl shadow-md border border-[#17212B]/10 p-8 sm:p-10">
        
        {/* Error Icon Badge */}
        <div className={`w-16 h-16 rounded-full mx-auto mb-5 flex items-center justify-center shadow-xs ${
          isWarningOnly ? 'bg-[#FEF0C7]' : 'bg-[#FEE4E2]'
        }`}>
          {renderIcon()}
        </div>

        {/* Title & Message */}
        <h2 className="font-heading text-2xl font-bold text-[#17212B] mb-2">
          {errorInfo.title}
        </h2>
        
        <p className="text-base text-[#17212B] leading-relaxed mb-4">
          {errorInfo.message}
        </p>

        {/* Actionable Hint Box */}
        {errorInfo.hint && (
          <div className="p-4 rounded-xl bg-[#F2F5F7] border border-[#17212B]/10 text-xs sm:text-sm text-[#5B6773] text-left mb-8">
            <p className="font-semibold text-[#17212B] mb-1">
              {language === 'hi' ? 'सलाह व सुझाव:' : 'How to resolve this:'}
            </p>
            <p>{errorInfo.hint}</p>
          </div>
        )}

        {/* Retry Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onRetry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#0E6F68] hover:bg-[#0a5751] transition-all shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E6F68]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{language === 'hi' ? 'दोबारा प्रयास करें' : 'Try Again'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
