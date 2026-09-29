import React, { useState } from 'react';
import {
  Phone,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Thermometer,
  Wind,
  X,
  RotateCcw,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  TRUST_STRIP_ITEMS,
  VERIFIED_SERVICES,
  ServiceItem,
  IMAGES,
} from '../data/siteContent';
import { ResilientImage } from './ResilientImage';

interface HeroAndServicesProps {
  onOpenPhoneModal: () => void;
  onSelectServiceForEstimate: (serviceName: string, note?: string, fromSection?: string) => void;
  onScrollToSection: (sectionId: string) => void;
}

export const HeroAndServices: React.FC<HeroAndServicesProps> = ({
  onOpenPhoneModal,
  onSelectServiceForEstimate,
  onScrollToSection,
}) => {
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceItem | null>(null);
  const [serviceFilter, setServiceFilter] = useState<string>('all');

  const filteredServices =
    serviceFilter === 'all'
      ? VERIFIED_SERVICES
      : VERIFIED_SERVICES.filter((s) =>
          serviceFilter === 'attic'
            ? s.id.includes('attic') || s.id.includes('removal')
            : serviceFilter === 'wall'
            ? s.id.includes('wall')
            : serviceFilter === 'spray'
            ? s.id.includes('spray')
            : s.id.includes('floor')
        );

  const activeModalIndex = activeServiceModal
    ? VERIFIED_SERVICES.findIndex((s) => s.id === activeServiceModal.id)
    : -1;

  const handlePrevServiceModal = () => {
    if (activeModalIndex < 0) return;
    const prevIdx =
      (activeModalIndex - 1 + VERIFIED_SERVICES.length) % VERIFIED_SERVICES.length;
    setActiveServiceModal(VERIFIED_SERVICES[prevIdx]);
  };

  const handleNextServiceModal = () => {
    if (activeModalIndex < 0) return;
    const nextIdx = (activeModalIndex + 1) % VERIFIED_SERVICES.length;
    setActiveServiceModal(VERIFIED_SERVICES[nextIdx]);
  };

  return (
    <>
      {/* SECTION 5: HERO SECTION */}
      <section
        id="top"
        aria-labelledby="hero-heading"
        className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-8 pb-16 sm:pt-12 sm:pb-20 lg:pt-16 lg:pb-24 overflow-hidden border-b border-slate-800"
      >
        {/* Subtle background ambient light */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(234, 88, 12, 0.25) 0%, transparent 50%), radial-gradient(circle at 80% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
          }}
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Core Value Proposition & Primary CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Local Verification Eyebrow */}
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-orange-400 font-medium tracking-wide">
                <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
                <span>Serving Greater Houston &amp; Southeast Texas · Residential &amp; Commercial</span>
              </div>

              {/* H1 Heading */}
              <h1
                id="hero-heading"
                className="font-editorial text-3xl sm:text-5xl lg:text-[3.25rem]/tight font-semibold tracking-tight text-white"
              >
                Make Your Houston Home More Comfortable &amp; Energy Efficient.
              </h1>

              {/* Supporting Copy answering: What we do, Who we serve, Where we operate, Why contact */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                <strong className="text-white font-medium">Houston Insulation Service</strong> installs professional residential, commercial, and industrial insulation across Greater Houston. We help property owners stop severe Texas heat transfer, seal drafty wall and roof cavities, and keep indoor temperatures comfortable year-round.
              </p>

              {/* Key Quick Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-800/70 border border-slate-700/80 rounded-xl p-3.5">
                  <Thermometer className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Attic, Roof, Wall Cavity &amp; Subfloor Solutions</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-800/70 border border-slate-700/80 rounded-xl p-3.5">
                  <Wind className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Spray Foam &amp; Air-Sealing Applications</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-800/70 border border-slate-700/80 rounded-xl p-3.5">
                  <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Complimentary On-Site Estimates</span>
                </div>
              </div>

              {/* Primary & Secondary High-Contrast Attractive CTAs */}
              <div className="pt-2 space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <a
                    href="#estimate"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectServiceForEstimate('Attic & Roof Insulation', undefined, 'top');
                    }}
                    className="group inline-flex items-center justify-center gap-3 px-7 py-4 text-sm sm:text-base font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-xl shadow-lg shadow-orange-950/50 inset-ring inset-ring-white/25 transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                  >
                    <span>GET A FREE ESTIMATE</span>
                    <span className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center transition-transform duration-150 group-hover:translate-x-0.5">
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </a>

                  <button
                    type="button"
                    onClick={onOpenPhoneModal}
                    aria-label={`Call Houston Insulation Service at ${BUSINESS_INFO.phoneDisplay}`}
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm sm:text-base font-semibold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-600 rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
                  >
                    <Phone className="w-4 h-4 text-orange-400 shrink-0 transition-transform group-hover:scale-105" aria-hidden="true" />
                    <span className="font-mono">CALL NOW: {BUSINESS_INFO.phoneDisplay}</span>
                  </button>
                </div>

                {/* Reassurance Micro-Copy */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    100% Free, No-Obligation Consultation
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    Monday – Friday Normal Business Hours
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset with Zero-Lag Priority Loading */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900">
                <ResilientImage
                  src={IMAGES.heroHome}
                  alt="Upscale single-family brick and stone home in Houston Texas with energy-efficient windows and insulated roofline"
                  containerClassName="relative h-[300px] sm:h-[380px] lg:h-[450px] w-full overflow-hidden bg-slate-950"
                  fallbackTitle="Houston Residential Insulation"
                  priority={true}
                />

                {/* Floating Architectural Overlay Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-3.5 sm:p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700/90 text-xs text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">Whole-Building Envelope Protection</p>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Attic · Exterior Walls · Spray Foam · Floors
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onScrollToSection('services')}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-orange-700 hover:bg-orange-600 text-white font-semibold text-xs whitespace-nowrap transition-colors cursor-pointer"
                  >
                    <span>Explore Services</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: TRUST STRIP */}
      <section
        id="trust-strip"
        aria-label="Core Facts and Verification"
        className="bg-white border-b border-slate-200 py-6 sm:py-8"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
            {TRUST_STRIP_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className={`pt-4 sm:pt-0 ${idx > 0 ? 'sm:pl-6 lg:pl-8' : ''} flex items-start gap-3`}
              >
                <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-700 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900 leading-snug">
                    {item.label}
                  </h2>
                  <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: SERVICES SECTION ("Insulation Solutions for Your Property") */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="py-16 sm:py-20 lg:py-28 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-orange-700">
                Tailored Thermal &amp; Acoustic Systems
              </p>
              <h2
                id="services-heading"
                className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
              >
                Insulation Solutions for Your Property
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether you need to stop radiant attic heat, insulate hollow exterior walls, apply spray foam to a roof deck, or protect subfloors and crawl spaces, we offer verified solutions for every building assembly.
              </p>
            </div>

            {/* Service Category Filter Tabs with Smooth Reset/Back Button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 self-start">
              {serviceFilter !== 'all' && (
                <button
                  type="button"
                  onClick={() => setServiceFilter('all')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors cursor-pointer self-start"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Show All Services</span>
                </button>
              )}

              <div
                role="group"
                aria-label="Filter insulation services by property area"
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-xl border border-slate-200 shadow-2xs"
              >
                {[
                  { id: 'all', label: 'All Services' },
                  { id: 'attic', label: 'Attic & Roof' },
                  { id: 'wall', label: 'Wall Cavities' },
                  { id: 'spray', label: 'Spray Foam' },
                  { id: 'floor', label: 'Floors & Foundations' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setServiceFilter(tab.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-700 ${
                      serviceFilter === tab.id
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Service Cards Grid */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => (
              <article
                key={service.id}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200 group"
              >
                <div>
                  {/* Service Image Header */}
                  <div className="relative overflow-hidden bg-slate-900">
                    <ResilientImage
                      src={service.image}
                      alt={service.imageAlt}
                      containerClassName="relative h-52 w-full overflow-hidden bg-slate-900"
                      fallbackTitle={service.name}
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-xs text-[11px] font-mono text-orange-300 border border-slate-700">
                      {service.category}
                    </div>
                  </div>

                  {/* Service Body Content */}
                  <div className="p-5 sm:p-7 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <span>SERVICE {service.index}</span>
                      <span aria-hidden="true">·</span>
                      <span>GREATER HOUSTON</span>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-orange-800 transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.summary}
                    </p>

                    {/* Key Benefit Bullets */}
                    <div className="pt-3 space-y-2 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-800">
                        Key Property Benefits:
                      </p>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {service.keyBenefits.slice(0, 3).map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer with Attractive CTA */}
                <div className="px-5 sm:px-7 pb-6 pt-3 flex items-center justify-between gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveServiceModal(service)}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-700"
                  >
                    Learn More
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectServiceForEstimate(service.shortTitle, undefined, 'services')
                    }
                    className="group/btn inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-lg shadow-xs transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-700"
                  >
                    <span>Get Free Estimate</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform duration-150 group-hover/btn:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom High-Attractiveness Conversion Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-lg">
            <div className="space-y-1.5 max-w-2xl">
              <p className="text-xs font-mono text-orange-400 uppercase tracking-wider">
                COMPLIMENTARY BUILDING ENVELOPE CONSULTATION
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                Not sure which insulation material or area to prioritize first?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We assess attics, walls, floors, and commercial spaces across Greater Houston to pinpoint where your property is losing comfort—and provide a clear, no-obligation Free Estimate.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() =>
                  onSelectServiceForEstimate(
                    'Not Sure — Recommend a Solution',
                    undefined,
                    'services'
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-xl shadow-md transition-all whitespace-nowrap cursor-pointer"
              >
                <span>GET A FREE ESTIMATE</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={onOpenPhoneModal}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
              >
                <Phone className="w-4 h-4 text-orange-400" aria-hidden="true" />
                <span>Call Dispatch</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE DETAILS MODAL WITH PREVIOUS / NEXT / BACK SMOOTH NAVIGATION */}
      {activeServiceModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs"
        >
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-5 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Top Navigation Bar inside Modal: Back to Services + Previous/Next Service */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setActiveServiceModal(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-orange-700" aria-hidden="true" />
                <span>Back to Services</span>
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevServiceModal}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Previous</span>
                </button>
                <span className="text-xs font-mono text-slate-400 px-1">
                  {activeModalIndex + 1}/{VERIFIED_SERVICES.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextServiceModal}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveServiceModal(null)}
                  aria-label="Close dialog"
                  className="ml-1 p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div>
              <p className="text-xs font-mono text-orange-700 font-semibold">
                {activeServiceModal.category} · SERVICE {activeServiceModal.index}
              </p>
              <h3 id="service-modal-title" className="text-xl sm:text-2xl font-semibold text-slate-900 mt-1">
                {activeServiceModal.name}
              </h3>
            </div>

            <div className="mt-5 space-y-5">
              <ResilientImage
                src={activeServiceModal.image}
                alt={activeServiceModal.imageAlt}
                containerClassName="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden bg-slate-900"
                fallbackTitle={activeServiceModal.name}
              />

              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Overview</h4>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  {activeServiceModal.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Ideal For</h4>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  {activeServiceModal.idealFor}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Key Benefits</h4>
                <ul className="mt-2 space-y-2 text-sm text-slate-600">
                  {activeServiceModal.keyBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Typical Application Areas</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  {activeServiceModal.applicationAreas.map((area, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-md text-xs text-slate-700 font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveServiceModal(null)}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to All Services</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const sName = activeServiceModal.shortTitle;
                  setActiveServiceModal(null);
                  onSelectServiceForEstimate(sName, undefined, 'services');
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-lg shadow-sm transition-all cursor-pointer"
              >
                <span>GET A FREE ESTIMATE FOR THIS SERVICE</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
