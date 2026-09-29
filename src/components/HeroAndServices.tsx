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
  Building2,
  Home,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  TRUST_STRIP_ITEMS,
  SERVICES_DATA,
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
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => {
          if (serviceFilter === 'spray') return s.id.includes('spray') || s.id.includes('energy');
          if (serviceFilter === 'attic') return s.id.includes('attic');
          if (serviceFilter === 'residential') return s.id.includes('residential') || s.id.includes('attic');
          if (serviceFilter === 'commercial') return s.id.includes('commercial');
          if (serviceFilter === 'construction') return s.id.includes('construction');
          return true;
        });

  const activeModalIndex = activeServiceModal
    ? SERVICES_DATA.findIndex((s) => s.id === activeServiceModal.id)
    : -1;

  const handlePrevServiceModal = () => {
    if (activeModalIndex < 0) return;
    const prevIdx =
      (activeModalIndex - 1 + SERVICES_DATA.length) % SERVICES_DATA.length;
    setActiveServiceModal(SERVICES_DATA[prevIdx]);
  };

  const handleNextServiceModal = () => {
    if (activeModalIndex < 0) return;
    const nextIdx = (activeModalIndex + 1) % SERVICES_DATA.length;
    setActiveServiceModal(SERVICES_DATA[nextIdx]);
  };

  return (
    <>
      {/* SECTION 2: HERO SECTION */}
      <section
        id="top"
        aria-labelledby="hero-heading"
        className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28 overflow-hidden border-b border-slate-800"
      >
        {/* Subtle background ambient radial glows */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 25%, rgba(234, 88, 12, 0.35) 0%, transparent 45%), radial-gradient(circle at 85% 65%, rgba(59, 130, 246, 0.2) 0%, transparent 45%)',
          }}
          aria-hidden="true"
        />

        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"
          aria-hidden="true"
        />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Value Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/40 text-xs sm:text-sm text-orange-300 font-medium shadow-inner backdrop-blur-xs">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shrink-0" />
                <span>Houston, Texas · Residential &amp; Commercial Spray Foam</span>
              </div>

              {/* H1 Heading */}
              <h1
                id="hero-heading"
                className="font-editorial text-3xl sm:text-5xl lg:text-[3.35rem]/tight font-semibold tracking-tight text-white"
              >
                Professional Spray Foam Insulation in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-amber-200">Houston, TX</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                Improve comfort, air sealing, and energy efficiency with professional spray foam insulation solutions for Houston homes and properties. We help property owners manage intense Texas heat transfer and seal building envelope gaps for long-term comfort.
              </p>

              {/* Feature Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-900/80 border border-slate-700/80 rounded-xl p-3.5 shadow-sm hover:border-slate-600 transition-colors">
                  <Wind className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-semibold block text-white">Air-Sealing Barrier</span>
                    <span className="text-slate-400 text-[11px]">Restricts drafts &amp; humidity</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-900/80 border border-slate-700/80 rounded-xl p-3.5 shadow-sm hover:border-slate-600 transition-colors">
                  <Thermometer className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-semibold block text-white">Attic Heat Defense</span>
                    <span className="text-slate-400 text-[11px]">Roofline thermal shield</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200 bg-slate-900/80 border border-slate-700/80 rounded-xl p-3.5 shadow-sm hover:border-slate-600 transition-colors">
                  <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <span className="font-semibold block text-white">Free Estimates</span>
                    <span className="text-slate-400 text-[11px]">No-obligation consultations</span>
                  </div>
                </div>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="pt-2 space-y-3.5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <a
                    href="#estimate"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectServiceForEstimate('Spray Foam Insulation', undefined, 'top');
                    }}
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-sm sm:text-base font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-xl shadow-lg cta-glow inset-ring inset-ring-white/20 transition-all whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 active:scale-95"
                  >
                    <span>Request a Free Estimate</span>
                    <span className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center transition-transform duration-150 group-hover:translate-x-1">
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </span>
                  </a>

                  <a
                    href={BUSINESS_INFO.phoneTel}
                    aria-label={`Call Houston Spray Foam Insulation at ${BUSINESS_INFO.phoneDisplay}`}
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-4 text-sm sm:text-base font-semibold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-600 rounded-xl shadow-sm transition-all whitespace-nowrap cursor-pointer hover:border-slate-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400 active:scale-95"
                  >
                    <Phone className="w-4 h-4 text-orange-400 shrink-0 transition-transform group-hover:scale-110" aria-hidden="true" />
                    <span className="font-mono font-medium">Call {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>

                {/* Reassurance Micro-Copy */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-xs text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    100% Free, No-Obligation Consultation
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                    Residential &amp; Commercial Service
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 shadow-2xl bg-slate-900 group">
                <ResilientImage
                  src={IMAGES.sprayFoamService}
                  alt="Professional spray foam insulation applied between structural timber roof rafters in Houston TX"
                  containerClassName="relative h-[320px] sm:h-[400px] lg:h-[460px] w-full overflow-hidden bg-slate-950"
                  fallbackTitle="Houston Spray Foam Insulation"
                  priority={true}
                />

                {/* Floating Architectural Badge */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-4 rounded-xl bg-slate-950/90 backdrop-blur-md border border-slate-700 text-xs text-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
                  <div>
                    <div className="flex items-center gap-1.5 text-orange-400 font-semibold text-[11px] uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Whole-Building Envelope Focus</span>
                    </div>
                    <p className="text-white font-medium text-xs mt-0.5">
                      Attics · Roof Decks · Walls · Commercial
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onScrollToSection('services')}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-orange-700 hover:bg-orange-600 text-white font-semibold text-xs whitespace-nowrap transition-colors cursor-pointer active:scale-95"
                  >
                    <span>View Services</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section
        id="trust-strip"
        aria-label="Core Facts and Principles"
        className="bg-white border-b border-slate-200 py-6 sm:py-8 shadow-xs"
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

      {/* SECTION 4: SERVICES */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="py-16 sm:py-20 lg:py-28 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
                Tailored Insulation &amp; Air-Sealing Solutions
              </p>
              <h2
                id="services-heading"
                className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
              >
                Insulation Services for Houston Properties
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Whether insulating a residential attic, upgrading an existing home, outfitting a commercial building, or sealing a new construction project, we provide professional solutions suited to your structure.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 self-start">
              {serviceFilter !== 'all' && (
                <button
                  type="button"
                  onClick={() => setServiceFilter('all')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-xl transition-colors cursor-pointer self-start"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Show All Services</span>
                </button>
              )}

              <div
                role="group"
                aria-label="Filter insulation services"
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white rounded-xl border border-slate-200 shadow-2xs"
              >
                {[
                  { id: 'all', label: 'All Services' },
                  { id: 'spray', label: 'Spray Foam' },
                  { id: 'attic', label: 'Attic' },
                  { id: 'residential', label: 'Residential' },
                  { id: 'commercial', label: 'Commercial' },
                  { id: 'construction', label: 'New Construction' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setServiceFilter(tab.id)}
                    className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-700 ${
                      serviceFilter === tab.id
                        ? 'bg-slate-900 text-white shadow-xs'
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
                className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col justify-between card-hover hover:border-slate-300 hover:shadow-lg group"
              >
                <div>
                  {/* Service Image Header */}
                  <div className="relative overflow-hidden bg-slate-900">
                    <ResilientImage
                      src={service.image}
                      alt={service.imageAlt}
                      containerClassName="relative h-56 w-full overflow-hidden bg-slate-900 group-hover:scale-105 transition-transform duration-300"
                      fallbackTitle={service.name}
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/90 backdrop-blur-xs text-[11px] font-mono text-orange-300 border border-slate-700">
                      {service.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 sm:p-7 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                      <span>SERVICE {service.index}</span>
                      <span aria-hidden="true">·</span>
                      <span>HOUSTON, TX</span>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 group-hover:text-orange-800 transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {service.summary}
                    </p>

                    {/* Benefit list */}
                    <div className="pt-3 space-y-2 border-t border-slate-100">
                      <p className="text-xs font-semibold text-slate-800">
                        Key Performance Benefits:
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

                {/* Footer Buttons */}
                <div className="px-5 sm:px-7 pb-6 pt-3 flex items-center justify-between gap-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveServiceModal(service)}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-700"
                  >
                    Learn More
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectServiceForEstimate(service.shortTitle, undefined, 'services')
                    }
                    className="group/btn inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-lg shadow-xs transition-all whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-700 active:scale-95"
                  >
                    <span>Request Estimate</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 transition-transform duration-150 group-hover/btn:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Banner */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl">
            <div className="space-y-1.5 max-w-2xl">
              <p className="text-xs font-mono text-orange-400 uppercase tracking-wider">
                COMPLIMENTARY ESTIMATES &amp; ASSESSMENTS
              </p>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                Need guidance on the best insulation approach for your property?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Contact Houston Spray Foam Insulation at 713-497-1773 to discuss your residential or commercial project. We provide straightforward recommendations tailored to your goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() =>
                  onSelectServiceForEstimate(
                    'Not Sure',
                    'Requesting consultation to determine the best insulation solution.',
                    'services'
                  )
                }
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-xl shadow-md cta-glow transition-all whitespace-nowrap cursor-pointer active:scale-95"
              >
                <span>Request Free Estimate</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors whitespace-nowrap font-mono active:scale-95"
              >
                <Phone className="w-4 h-4 text-orange-400" aria-hidden="true" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE DETAIL MODAL */}
      {activeServiceModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs"
        >
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header Image */}
            <div className="relative h-48 sm:h-56 bg-slate-900 shrink-0">
              <ResilientImage
                src={activeServiceModal.image}
                alt={activeServiceModal.imageAlt}
                containerClassName="relative h-full w-full overflow-hidden bg-slate-900"
                fallbackTitle={activeServiceModal.name}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
              <button
                type="button"
                onClick={() => setActiveServiceModal(null)}
                aria-label="Close details"
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center border border-slate-700 cursor-pointer transition-transform hover:scale-105"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
              <div className="absolute bottom-4 left-5 right-5">
                <span className="px-2.5 py-1 rounded bg-orange-700 text-white text-xs font-mono">
                  {activeServiceModal.category}
                </span>
                <h3
                  id="service-modal-title"
                  className="mt-1 text-xl sm:text-2xl font-semibold text-white tracking-tight"
                >
                  {activeServiceModal.name}
                </h3>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-6 text-sm text-slate-600">
              <div>
                <p className="font-semibold text-slate-900 mb-1.5">Overview &amp; Purpose:</p>
                <p className="leading-relaxed">{activeServiceModal.summary}</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-xs font-semibold text-orange-800 uppercase tracking-wider">
                  Recommended For:
                </p>
                <p className="mt-1 text-sm text-slate-800 font-medium">
                  {activeServiceModal.idealFor}
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-900 mb-2">Key Property Benefits:</p>
                <ul className="space-y-2">
                  {activeServiceModal.keyBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-semibold text-slate-900 mb-2">Typical Application Areas:</p>
                <div className="flex flex-wrap gap-2">
                  {activeServiceModal.applicationAreas.map((area, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg border border-slate-200 font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions Footer */}
            <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevServiceModal}
                  className="px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors cursor-pointer"
                >
                  Previous Service
                </button>
                <button
                  type="button"
                  onClick={handleNextServiceModal}
                  className="px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg border border-slate-300 transition-colors cursor-pointer"
                >
                  Next Service
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const svcName = activeServiceModal.shortTitle;
                    setActiveServiceModal(null);
                    onSelectServiceForEstimate(svcName, undefined, 'services');
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-lg transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  Request Estimate for {activeServiceModal.shortTitle}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
