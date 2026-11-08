import React from 'react';
import { IndianRupee, Gift, AlertOctagon, Languages } from 'lucide-react';
import { uiText } from '../translations';

/**
 * 4 Core Feature Cards highlighting OfferLens advantages for freshers.
 */
export default function FeatureCards({ language }) {
  const t = uiText[language].features;

  const features = [
    {
      icon: IndianRupee,
      title: t.card1Title,
      description: t.card1Desc,
      iconBg: "bg-[#E7F3F2]",
      iconColor: "text-[#0E6F68]",
      badge: "In-Hand Pay"
    },
    {
      icon: Gift,
      title: t.card2Title,
      description: t.card2Desc,
      iconBg: "bg-[#E7F3F2]",
      iconColor: "text-[#0E6F68]",
      badge: "Perks & Leaves"
    },
    {
      icon: AlertOctagon,
      title: t.card3Title,
      description: t.card3Desc,
      iconBg: "bg-[#FEE4E2]",
      iconColor: "text-[#B42318]",
      badge: "Clause Safety"
    },
    {
      icon: Languages,
      title: t.card4Title,
      description: t.card4Desc,
      iconBg: "bg-[#E7F3F2]",
      iconColor: "text-[#0E6F68]",
      badge: "Bilingual"
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 bg-[#F2F5F7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase font-bold tracking-widest text-[#0E6F68] bg-white px-3 py-1 rounded-full border border-[#17212B]/5 shadow-xs">
            Why OfferLens
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl font-bold text-[#17212B] mt-3">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-[#5B6773] mt-2">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-7 border border-[#17212B]/5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl ${feature.iconBg} ${feature.iconColor} flex items-center justify-center`}>
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F2F5F7] text-[#5B6773]">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[#17212B] mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#5B6773] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#17212B]/5 flex items-center text-xs font-medium text-[#0E6F68]">
                  <span>Instant automated analysis</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
