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
  Snowflake,
  ExternalLink,
  Instagram,
  Check,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  WHY_SPRAY_FOAM_PILLARS,
  ONTARIO_PROPERTY_PILLARS,
  PROCESS_STEPS,
  TRUST_PILLARS,
  FAQ_ITEMS,
  IMAGES,
} from '../data/siteContent';
import { ResilientImage } from './ResilientImage';

interface InteractiveSectionsProps {
  onSelectServiceForEstimate: (serviceName: string, note?: string, fromSection?: string) => void;
  onOpenPhoneModal: () => void;
  onScrollToSection: (sectionId: string, fromSectionOverride?: string) => void;
}

export const InteractiveSections: React.FC<InteractiveSectionsProps> = ({
  onSelectServiceForEstimate,
  onOpenPhoneModal,
  onScrollToSection,
}) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-what-is');
  const [activeOntarioPillarId, setActiveOntarioPillarId] = useState<string>(
    ONTARIO_PROPERTY_PILLARS[0].id
  );

  const activeOntarioPillar =
    ONTARIO_PROPERTY_PILLARS.find((p) => p.id === activeOntarioPillarId) ||
    ONTARIO_PROPERTY_PILLARS[0];

  return (
    <>
      {/* SECTION 5: WHY SPRAY FOAM INSULATION (EDUCATIONAL & CLIMATE SCIENCE) */}
      <section
        id="why-spray-foam"
        aria-labelledby="why-spray-foam-heading"
        className="py-16 sm:py-20 lg:py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Building Science &amp; Thermal Envelopes
            </p>
            <h2
              id="why-spray-foam-heading"
              className="mt-2.5 text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight"
            >
              Why Spray Foam Insulation
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Spray foam expands upon application to create an airtight, unbroken thermal and moisture barrier. Engineered for Ontario&rsquo;s rigorous climate, spray foam keeps heated air indoors during sub-zero winters and blocks oppressive humidity during summer heat waves.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_SPRAY_FOAM_PILLARS.map((pillar) => (
              <div
                key={pillar.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 flex flex-col justify-between hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                    <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                      BENEFIT {pillar.index}
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Thermal Science
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-slate-900 group-hover:text-emerald-900 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                    {pillar.subtitle}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-start gap-2 text-[11px] text-slate-500 italic bg-white/60 p-2.5 rounded-lg">
                  <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{pillar.scienceNote}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Banner CTA inside Why Spray Foam */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-950 text-white border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                Steady Indoor Comfort
              </p>
              <h3 className="text-lg sm:text-xl font-bold">
                Ready to stabilize your home&rsquo;s temperature and energy bills?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Contact Dr. Foam for professional insulation services from Barrie to North Bay, ON.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => onScrollToSection('estimate', 'why-spray-foam')}
                className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all cursor-pointer text-center"
              >
                Request Free Estimate
              </button>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="px-5 py-3 rounded-xl font-bold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: ONTARIO-SPECIFIC CONTENT (BARRIE TO NORTH BAY & MUSKOKA) */}
      <section
        id="ontario-solutions"
        aria-labelledby="ontario-heading"
        className="py-16 sm:py-20 lg:py-28 bg-slate-100/70 border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Regional Climate &amp; Architecture
            </p>
            <h2
              id="ontario-heading"
              className="mt-2 text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight"
            >
              Insulation Solutions for Ontario Properties
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Central Ontario homes and cottages experience one of the most demanding thermal environments in North America—intense sub-zero winter freezes, heavy snow loads, and hot humid summers. Here is how Dr. Foam addresses key regional challenges:
            </p>
          </div>

          {/* Interactive Property & Climate Pillars */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left selector tabs */}
            <div className="lg:col-span-5 space-y-3">
              {ONTARIO_PROPERTY_PILLARS.map((pillar) => {
                const isActive = activeOntarioPillarId === pillar.id;
                return (
                  <button
                    key={pillar.id}
                    type="button"
                    onClick={() => setActiveOntarioPillarId(pillar.id)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500/20'
                        : 'bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <span
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          isActive
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {pillar.badge}
                      </span>
                      <p
                        className={`text-sm sm:text-base font-bold ${
                          isActive ? 'text-slate-900' : 'text-slate-700'
                        }`}
                      >
                        {pillar.title}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${
                        isActive ? 'text-emerald-600 translate-x-1' : 'text-slate-400'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Right dynamic challenge & solution details */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
                  {activeOntarioPillar.badge} Analysis
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Barrie · Muskoka · North Bay
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold text-slate-900">
                {activeOntarioPillar.title}
              </h3>

              <div className="mt-5 space-y-4">
                <div className="p-4 rounded-xl bg-red-50/70 border border-red-200/80">
                  <p className="text-xs font-bold text-red-900 uppercase tracking-wide">
                    The Climate Challenge:
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-red-950 leading-relaxed">
                    {activeOntarioPillar.challenge}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                  <p className="text-xs font-bold text-emerald-900 uppercase tracking-wide">
                    Dr. Foam Engineered Solution:
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-emerald-950 leading-relaxed">
                    {activeOntarioPillar.solution}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <p className="text-xs font-semibold text-slate-700 italic">
                  &ldquo;{activeOntarioPillar.highlight}&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() =>
                    onSelectServiceForEstimate(
                      'Spray Foam Insulation',
                      `Ontario solution inquiry: ${activeOntarioPillar.title}`,
                      'ontario-solutions'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-emerald-700 transition-colors cursor-pointer ml-auto"
                >
                  <span>Request Solution Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: 4-STEP PRESCRIPTION PROCESS */}
      <section
        id="process"
        aria-labelledby="process-heading"
        className="py-16 sm:py-20 lg:py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Simple &amp; Transparent Workflow
            </p>
            <h2
              id="process-heading"
              className="mt-2 text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight"
            >
              Our 4-Step Insulation Process
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              From initial call to final quality inspection, Dr. Foam makes building envelope upgrades straightforward and hassle-free.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between hover:bg-white hover:border-emerald-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-mono font-bold text-lg border border-emerald-200 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                    {step.number}
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                    {step.subtitle}
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/80">
                  <span className="text-[11px] font-medium text-slate-500">
                    Outcome: <span className="text-slate-800 font-semibold">{step.deliverable}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: TRUST SECTION (WHY DR. FOAM) */}
      <section
        id="trust"
        aria-labelledby="trust-heading"
        className="py-16 sm:py-20 lg:py-28 bg-slate-900 text-white border-b border-slate-800"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Quality · Integrity · Expertise
            </p>
            <h2
              id="trust-heading"
              className="mt-2 text-2xl sm:text-4xl font-bold text-white tracking-tight"
            >
              Why Property Owners Trust Dr. Foam
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
              We focus on building science fundamentals, certified insulation formulations, and clear communication to deliver reliable building envelope performance.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TRUST_PILLARS.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                  <h3 className="mt-4 text-base sm:text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Proof & Instagram Tagline Block */}
          <div className="mt-10 p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-white p-0.5 shadow-lg ring-2 ring-emerald-400 overflow-hidden shrink-0">
                  <img
                    src={IMAGES.logo}
                    alt="Dr Foam Instagram Profile Logo"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow">
                  <Instagram className="w-3 h-3" />
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Follow Dr. Foam on Instagram</p>
                <a
                  href={BUSINESS_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  <span>{BUSINESS_INFO.instagramHandle}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center sm:text-right max-w-md">
              &ldquo;Keep your home warm in winter, cool in summer, and your bills steady.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 11: FAQ SECTION */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="py-16 sm:py-20 lg:py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Got Questions?
            </p>
            <h2
              id="faq-heading"
              className="mt-2 text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight"
            >
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Clear, factual answers to help you understand spray foam insulation and prepare for your project.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 space-y-3.5">
            {FAQ_ITEMS.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all ${
                    isOpen
                      ? 'border-emerald-400 bg-emerald-50/20 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-2xl"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-emerald-700 text-white rotate-180'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-emerald-100/60 pt-3 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quick FAQ CTA */}
          <div className="mt-10 text-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <p className="text-sm font-semibold text-slate-800">
              Have a specific question about your property?
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Call our team at{' '}
              <a
                href={BUSINESS_INFO.phoneTel}
                className="font-bold text-emerald-700 hover:underline"
              >
                {BUSINESS_INFO.phoneDisplay}
              </a>{' '}
              or email{' '}
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="font-bold text-emerald-700 hover:underline"
              >
                {BUSINESS_INFO.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
