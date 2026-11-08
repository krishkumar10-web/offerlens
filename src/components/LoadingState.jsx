import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, FileSearch, Sparkles, AlertCircle } from 'lucide-react';
import { uiText } from '../translations';

/**
 * Loading state: Displays "Reading your letter..." with 3 sequential steps
 * lighting up one-by-one (Reading -> Understanding -> Summarizing).
 */
export default function LoadingState({ language }) {
  const t = uiText[language].loading;

  // Active step index: 1 = Reading, 2 = Understanding, 3 = Summarizing
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    // Step 1: active at 0ms
    // Step 2: activates around 700ms
    const timer1 = setTimeout(() => {
      setActiveStep(2);
    }, 700);

    // Step 3: activates around 1400ms
    const timer2 = setTimeout(() => {
      setActiveStep(3);
    }, 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const steps = [
    { id: 1, label: t.step1 },
    { id: 2, label: t.step2 },
    { id: 3, label: t.step3 },
  ];

  return (
    <div className="py-16 md:py-24 max-w-xl mx-auto px-4 text-center">
      <div className="bg-white rounded-xl shadow-md border border-[#17212B]/10 p-8 sm:p-12">
        
        {/* Animated Icon Ring */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-[#E7F3F2] animate-pulse" />
          <div className="w-16 h-16 rounded-full bg-[#E7F3F2] text-[#0E6F68] flex items-center justify-center shadow-xs">
            <Loader2 className="w-8 h-8 animate-spin" aria-hidden="true" />
          </div>
        </div>

        {/* Headings */}
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#17212B]">
          {t.headline}
        </h2>
        <p className="text-sm text-[#5B6773] mt-2 mb-8">
          {t.subheadline}
        </p>

        {/* 3 Sequential Progress Steps */}
        <div className="space-y-4 text-left max-w-sm mx-auto">
          {steps.map((step) => {
            const isCompleted = activeStep > step.id;
            const isCurrent = activeStep === step.id;
            const isPending = activeStep < step.id;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-3.5 p-3.5 rounded-xl border transition-all duration-300 ${
                  isCompleted
                    ? 'bg-[#E7F3F2]/60 border-[#9DD0CC] text-[#0E6F68]'
                    : isCurrent
                    ? 'bg-white border-[#0E6F68] shadow-sm text-[#17212B]'
                    : 'bg-[#F2F5F7]/50 border-transparent text-[#5B6773]/60'
                }`}
              >
                {/* Step indicator circle */}
                <div className="shrink-0">
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-[#0E6F68] text-white flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-6 h-6 rounded-full bg-[#0E6F68] text-white flex items-center justify-center animate-bounce">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-semibold text-gray-400">
                      {step.id}
                    </div>
                  )}
                </div>

                {/* Step Label */}
                <span className={`text-sm font-medium ${isCurrent ? 'font-semibold text-[#17212B]' : ''}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>

        <p className="text-xs text-[#5B6773] mt-8 pt-4 border-t border-[#17212B]/10">
          This usually takes about 2 seconds • In-memory security check
        </p>

      </div>
    </div>
  );
}
