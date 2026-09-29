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
  Snowflake,
  Sun,
  Flame,
  Check,
  Award,
  Calendar,
  Mail,
  MapPin,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  SERVICES_DATA,
  ServiceItem,
  IMAGES,
} from '../data/siteContent';
import { ResilientImage } from './ResilientImage';
import { DrFoamBrandLogo } from './DrFoamBrandLogo';

interface HeroAndServicesProps {
  onOpenPhoneModal: () => void;
  onSelectServiceForEstimate: (serviceName: string, note?: string, fromSection?: string) => void;
  onScrollToSection: (sectionId: string, fromSectionOverride?: string) => void;
}

export const HeroAndServices: React.FC<HeroAndServicesProps> = ({
  onOpenPhoneModal,
  onSelectServiceForEstimate,
  onScrollToSection,
}) => {
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'Thermal & Air Barrier', label: 'Spray Foam' },
    { id: 'Roof Deck & Ceiling Planes', label: 'Attic Insulation' },
    { id: 'Homes & Waterfront Properties', label: 'Residential & Cottages' },
    { id: 'Commercial & Industrial', label: 'Commercial' },
  ];

  const filteredServices =
    activeCategory === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* SECTION 2: HERO SECTION */}
      <section
        id="top"
        aria-labelledby="hero-heading"
        className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden border-b border-slate-800"
      >
        {/* Glow ambient background accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/5 blur-[100px] pointer-events-none" />

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* LEFT COLUMN: HERO HEADLINE & CALL TO ACTIONS */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Regional Authority Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold shadow-inner shadow-emerald-500/10 backdrop-blur-sm mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Barrie · Muskoka · Parry Sound · North Bay, ON</span>
              </div>

              {/* H1 Primary Conversion Headline */}
              <h1
                id="hero-heading"
                className="text-3xl sm:text-5xl lg:text-5xl/tight font-extrabold tracking-tight text-white"
              >
                Keep Your Home{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400">
                  Warm in Winter,
                </span>{' '}
                Cool in Summer, &amp; Your Bills Steady.
              </h1>

              {/* Instagram post brand hook & supportive copy */}
              <div className="mt-5 space-y-3 max-w-2xl">
                <p className="text-base sm:text-lg text-emerald-100/90 font-medium bg-emerald-950/40 border-l-2 border-emerald-400 pl-3.5 py-1 rounded-r-md">
                  &ldquo;Your energy bill shouldn&rsquo;t act like it&rsquo;s at Canada&rsquo;s Wonderland. Unless you enjoy paying for excitement!&rdquo;
                </p>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  Professional residential and commercial spray foam insulation solutions engineered for Ontario&rsquo;s extreme climate swings. Serving homes, four-season cottages, and commercial buildings from Barrie to North Bay.
                </p>
              </div>

              {/* PRIMARY & SECONDARY CONVERSION ACTIONS */}
              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => onScrollToSection('estimate', 'top')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 hover:from-emerald-300 hover:to-emerald-400 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Request a Free Estimate</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-emerald-500/50 shadow-md transition-all group"
                >
                  <Phone className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              {/* HERO REASSURANCES */}
              <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-slate-300 w-full">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Free, No-Obligation Quotes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Sub-Zero Winter Tested</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Homes, Cottages &amp; Commercial</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: HERO VISUAL & VALUE HIGHLIGHTS */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl group">
                <ResilientImage
                  src={IMAGES.sprayFoamService}
                  alt="Dr Foam Insulation Ltd. professional spray foam insulation application in Ontario"
                  className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  priority={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Floating Climate Badge */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/90 border border-slate-700 text-slate-200 text-xs font-semibold backdrop-blur-md">
                    <Snowflake className="w-3.5 h-3.5 text-cyan-400" />
                    <span>-30°C Winter to +32°C Summer</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-700 text-emerald-300 text-xs font-semibold backdrop-blur-md">
                    <Thermometer className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Thermal Seal</span>
                  </span>
                </div>

                {/* Bottom Highlight Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow-md shrink-0 ring-1 ring-emerald-500/40">
                        <img
                          src={IMAGES.logo}
                          alt="Dr Foam Logo"
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                          Dr. Foam Prescription
                        </p>
                        <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
                          Continuous Air &amp; Vapor Barrier
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-2.5 py-1 rounded border border-slate-700 shrink-0">
                      drfoam.ca
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-slate-900 border-b border-slate-800 py-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <p className="text-xs text-slate-400">Coverage Corridor</p>
              <p className="text-sm sm:text-base font-bold text-emerald-400 mt-0.5">Barrie to North Bay</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <p className="text-xs text-slate-400">Phone Consultation</p>
              <p className="text-sm sm:text-base font-bold text-white mt-0.5">705-733-1163</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <p className="text-xs text-slate-400">Target Results</p>
              <p className="text-sm sm:text-base font-bold text-emerald-400 mt-0.5">Warm Winter / Cool Summer</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <p className="text-xs text-slate-400">Instagram Community</p>
              <p className="text-sm sm:text-base font-bold text-white mt-0.5">@dr_foam_insulation_ltd</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: SERVICES OVERVIEW */}
      <section
        id="services"
        aria-labelledby="services-heading"
        className="py-16 sm:py-20 lg:py-28 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-200">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                Comprehensive Insulation Solutions
              </p>
              <h2
                id="services-heading"
                className="mt-2 text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight"
              >
                Insulation Services Engineered for Ontario Properties
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Explore tailored insulation and air sealing solutions designed to protect your home, cottage, or commercial building from harsh freeze-thaw cycles and extreme heat.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 self-start md:self-end bg-slate-200/70 p-1.5 rounded-xl border border-slate-300">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* SERVICE CARDS GRID */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                    <ResilientImage
                      src={service.image}
                      alt={service.imageAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/85 text-emerald-300 border border-slate-700 font-mono text-[11px] font-bold">
                      {service.index} · {service.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {service.name}
                    </h3>
                    <p className="mt-2.5 text-xs text-slate-500 font-medium">
                      <span className="font-semibold text-slate-700">Ideal for:</span> {service.idealFor}
                    </p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                      {service.summary}
                    </p>

                    <ul className="mt-4 space-y-2 text-xs text-slate-700">
                      {service.keyBenefits.slice(0, 3).map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0 flex items-center justify-between gap-3 border-t border-slate-100 mt-4">
                  <button
                    type="button"
                    onClick={() => setSelectedServiceModal(service)}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline underline-offset-4 cursor-pointer"
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onSelectServiceForEstimate(
                        service.name,
                        `Interested in ${service.name} for my property.`
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-slate-900 hover:bg-emerald-700 transition-colors cursor-pointer"
                  >
                    <span>Get Quote</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE DETAILS MODAL */}
      {selectedServiceModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  {selectedServiceModal.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedServiceModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedServiceModal(null)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedServiceModal.summary}
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Key Application Areas
                </h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedServiceModal.applicationAreas.map((area, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-slate-100 text-slate-800 font-medium px-2.5 py-1 rounded-md border border-slate-200"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Performance Benefits
                </h4>
                <ul className="mt-2 space-y-2 text-xs text-slate-700">
                  {selectedServiceModal.keyBenefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const svc = selectedServiceModal;
                    setSelectedServiceModal(null);
                    onSelectServiceForEstimate(
                      svc.name,
                      `Detailed quote requested for ${svc.name}.`
                    );
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-800 shadow-md transition-colors"
                >
                  <span>Request Estimate for this Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-700" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
