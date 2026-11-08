import React from 'react';
import { Upload, Cpu, FileCheck2 } from 'lucide-react';
import { uiText } from '../translations';

/**
 * "How it works" section presenting the 3 clear steps for freshers.
 */
export default function HowItWorks({ language }) {
  const t = uiText[language].howItWorks;

  const steps = [
    {
      num: "01",
      icon: Upload,
      title: t.step1Title,
      desc: t.step1Desc
    },
    {
      num: "02",
      icon: Cpu,
      title: t.step2Title,
      desc: t.step2Desc
    },
    {
      num: "03",
      icon: FileCheck2,
      title: t.step3Title,
      desc: t.step3Desc
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-y border-[#17212B]/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[#0E6F68] bg-[#E7F3F2] px-3 py-1 rounded-full">
            Simple Process
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#17212B] mt-3">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#5B6773] mt-2">
            {t.subtitle}
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Subtle connecting line across desktop steps */}
          <div className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-[2px] bg-gradient-to-r from-[#9DD0CC]/30 via-[#0E6F68]/30 to-[#9DD0CC]/30 -z-0" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="relative bg-[#F2F5F7] rounded-xl p-7 border border-[#17212B]/5 shadow-xs hover:shadow-md transition-all z-10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-white text-[#0E6F68] flex items-center justify-center shadow-xs border border-[#17212B]/5">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-2xl font-bold text-[#9DD0CC]">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#17212B] mb-2">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-[#5B6773] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#17212B]/5 text-xs font-semibold text-[#0E6F68] flex items-center gap-1.5">
                  <span>Fast, Private & Simple</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
