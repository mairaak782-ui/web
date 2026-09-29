import React, { useState } from 'react';
import {
  Wind,
  Thermometer,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Phone,
  Layers,
  Sun,
  Droplets,
  Zap,
  Building,
  Home,
  Clock,
  Sparkles,
  Info,
  Flame,
  Shield,
  FileCheck,
  Award,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  WHY_SPRAY_FOAM_PILLARS,
  HOUSTON_PROPERTY_PILLARS,
  PROCESS_STEPS,
  TRUST_PILLARS,
  FAQ_ITEMS,
  IMAGES,
} from '../data/siteContent';
import { ResilientImage } from './ResilientImage';

interface InteractiveSectionsProps {
  onSelectServiceForEstimate: (serviceName: string, note?: string, fromSection?: string) => void;
  onOpenPhoneModal: () => void;
}

export const InteractiveSections: React.FC<InteractiveSectionsProps> = ({
  onSelectServiceForEstimate,
  onOpenPhoneModal,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-what-is');
  const [activeHoustonPillarId, setActiveHoustonPillarId] = useState<string>(
    HOUSTON_PROPERTY_PILLARS[0].id
  );

  const activeHoustonPillar =
    HOUSTON_PROPERTY_PILLARS.find((p) => p.id === activeHoustonPillarId) ||
    HOUSTON_PROPERTY_PILLARS[0];

  return (
    <>
      {/* SECTION 5: WHY SPRAY FOAM INSULATION (EDUCATIONAL SECTION) */}
      <section
        id="why-spray-foam"
        aria-labelledby="why-spray-foam-heading"
        className="py-16 sm:py-20 lg:py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
              Building Science &amp; Thermal Envelopes
            </p>
            <h2
              id="why-spray-foam-heading"
              className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
            >
              Why Spray Foam Insulation
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Spray foam insulation expands upon application to create both a thermal barrier and an air seal. Depending on your property structure and installation scope, high-performance spray foam can help improve indoor comfort, reduce unwanted air leakage, and support better temperature consistency.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_SPRAY_FOAM_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 flex flex-col justify-between card-hover hover:bg-white hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                    <span className="font-mono text-xs font-semibold text-orange-700 bg-orange-100/70 px-2 py-0.5 rounded-md">
                      BENEFIT {pillar.index}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Thermal Science
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-orange-900 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-orange-800 mt-0.5">
                    {pillar.subtitle}
                  </p>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Science Insight: </span>
                  {pillar.scienceNote}
                </div>
              </div>
            ))}
          </div>

          {/* Scientific Disclaimer Note */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start gap-3.5 text-xs text-slate-600 shadow-2xs">
            <Info className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="leading-relaxed">
              <strong>Factual Performance Notice:</strong> Thermal resistance and air-sealing results can vary depending on existing construction materials, installation depth, HVAC efficiency, and property ventilation. We evaluate each Houston property individually to recommend an appropriate solution.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: HOUSTON-SPECIFIC CONTENT ("Insulation Solutions for Houston Properties") */}
      <section
        id="houston-solutions"
        aria-labelledby="houston-solutions-heading"
        className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800 relative overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-10 border-b border-slate-800">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                Local Climate Context · Houston, Texas
              </p>
              <h2
                id="houston-solutions-heading"
                className="mt-2.5 text-2xl sm:text-4xl font-semibold text-white tracking-tight"
              >
                Insulation Solutions for Houston Properties
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm text-slate-300 leading-relaxed">
                Southeast Texas presents unique environmental demands: intense summer heat, high attic temperatures, elevated Gulf Coast humidity, and continuous air conditioning cycles. Explore how targeted insulation addresses these challenges.
              </p>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left selector buttons */}
            <div className="lg:col-span-5 space-y-3">
              {HOUSTON_PROPERTY_PILLARS.map((item, idx) => {
                const isSelected = item.id === activeHoustonPillarId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveHoustonPillarId(item.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-400 active:scale-98 ${
                      isSelected
                        ? 'bg-slate-800/95 border-orange-500/80 shadow-lg text-white ring-1 ring-orange-500/30'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-lg text-xs font-mono font-semibold flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-orange-600 text-white' : 'bg-slate-800 text-slate-400'
                        }`}>
                          0{idx + 1}
                        </span>
                        <span className="font-semibold text-sm sm:text-base">
                          {item.title}
                        </span>
                      </div>
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isSelected ? 'text-orange-400 translate-x-1' : 'text-slate-600'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right details card */}
            <div className="lg:col-span-7 bg-slate-800/90 border border-slate-700/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl backdrop-blur-xs">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
                <span className="text-xs font-mono text-orange-400 font-semibold uppercase tracking-wider">
                  HOUSTON CLIMATE ARCHITECTURE
                </span>
                <span className="text-xs text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-700">
                  Residential &amp; Commercial
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {activeHoustonPillar.title}
                </h3>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-700/80">
                  <p className="text-xs font-semibold text-orange-400 mb-1.5 uppercase tracking-wide">
                    The Houston Environmental Challenge:
                  </p>
                  <p className="text-slate-200">{activeHoustonPillar.challenge}</p>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-slate-900/90 border border-slate-700/80">
                  <p className="text-xs font-semibold text-emerald-400 mb-1.5 uppercase tracking-wide">
                    The Spray Foam &amp; Insulation Solution:
                  </p>
                  <p className="text-slate-200">{activeHoustonPillar.solution}</p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-slate-700/80">
                <p className="text-xs text-slate-300 font-medium max-w-sm flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{activeHoustonPillar.highlight}</span>
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onSelectServiceForEstimate(
                      'Spray Foam Insulation',
                      `Inquiring regarding Houston climate solution: ${activeHoustonPillar.title}`,
                      'houston-solutions'
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 text-white text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer shadow-md cta-glow active:scale-95"
                >
                  <span>Request an Estimate</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: PROCESS SECTION (4-STEP PROCESS) */}
      <section
        id="process"
        aria-labelledby="process-heading"
        className="py-16 sm:py-20 lg:py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
              Simple &amp; Transparent Workflow
            </p>
            <h2
              id="process-heading"
              className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
            >
              Our 4-Step Insulation Process
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              We make improving your property’s insulation straightforward, from your initial phone call to the completed installation.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="bg-slate-50/80 border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between card-hover hover:bg-white hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                    <span className="font-mono text-2xl font-bold text-orange-700 group-hover:scale-105 transition-transform">
                      {step.number}
                    </span>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                      STEP
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:text-orange-900 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-orange-800 mt-0.5">
                    {step.subtitle}
                  </p>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-700 font-medium">
                  <span className="text-orange-700 font-semibold">Deliverable: </span>
                  {step.deliverable}
                </div>
              </div>
            ))}
          </div>

          {/* Strategic CTA Strip */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/70 border border-orange-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                Ready to Discuss Your Property’s Insulation Needs?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Schedule a consultation with Houston Spray Foam Insulation today.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="#estimate"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectServiceForEstimate('Spray Foam Insulation', undefined, 'process');
                }}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-xl shadow-xs transition-all whitespace-nowrap cta-glow active:scale-95"
              >
                <span>Request a Free Estimate</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-colors whitespace-nowrap font-mono active:scale-95"
              >
                <Phone className="w-4 h-4 text-orange-700" aria-hidden="true" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: TRUST SECTION (WHY CHOOSE US) */}
      <section
        id="trust"
        aria-labelledby="trust-heading"
        className="py-16 sm:py-20 lg:py-28 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
              Professional Standards · Quality-Driven Service
            </p>
            <h2
              id="trust-heading"
              className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
            >
              Why Houston Property Owners Choose Us
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              We focus on delivering high-quality insulation solutions built on clear communication, thorough on-site preparation, and dependable local service.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_PILLARS.map((pillar, i) => (
              <div
                key={i}
                className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs card-hover hover:border-slate-300 hover:shadow-md transition-all"
              >
                <div>
                  <span className="inline-block text-[11px] font-mono font-semibold px-2.5 py-1 rounded-md bg-orange-50 text-orange-800 border border-orange-200/80 mb-3">
                    {pillar.tag}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQ SECTION */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="py-16 sm:py-20 lg:py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left summary */}
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
                Helpful Answers · Educational Guidance
              </p>
              <h2
                id="faq-heading"
                className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
              >
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Have questions about spray foam insulation, attic applications, or requesting an estimate in Houston? Find answers below or contact our team directly.
              </p>

              {/* Quick Contact Card */}
              <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-2xs">
                <p className="text-sm font-semibold text-slate-900">
                  Have a specific property question?
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Reach our team during normal business hours or submit an online request anytime.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href="#estimate"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectServiceForEstimate('Spray Foam Insulation', undefined, 'faq');
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-xl shadow-xs transition-all whitespace-nowrap cta-glow active:scale-95"
                  >
                    <span>Request Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <a
                    href={BUSINESS_INFO.phoneTel}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors whitespace-nowrap font-mono active:scale-95"
                  >
                    <Phone className="w-3.5 h-3.5 text-orange-700" aria-hidden="true" />
                    <span>{BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right accordion */}
            <div className="lg:col-span-7 space-y-3">
              {FAQ_ITEMS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className={`border rounded-2xl overflow-hidden transition-colors ${
                      isOpen ? 'border-orange-200 bg-orange-50/20 shadow-xs' : 'border-slate-200 bg-slate-50/80 hover:border-slate-300'
                    }`}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${faq.id}`}
                        id={`faq-trigger-${faq.id}`}
                        className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-700"
                      >
                        <div>
                          <span className="text-xs text-orange-700 font-semibold uppercase tracking-wider block mb-1">
                            {faq.category}
                          </span>
                          <span className="text-sm sm:text-base font-semibold text-slate-900">
                            {faq.question}
                          </span>
                        </div>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                          isOpen ? 'bg-orange-100 text-orange-700' : 'bg-slate-200 text-slate-600'
                        }`}>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-orange-700' : ''
                            }`}
                            aria-hidden="true"
                          />
                        </div>
                      </button>
                    </h3>
                    {isOpen && (
                      <div
                        id={`faq-panel-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${faq.id}`}
                        className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-200/60 animate-in fade-in"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
