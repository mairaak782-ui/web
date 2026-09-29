import React, { useState, useEffect } from 'react';
import {
  Phone,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Mail,
  X,
  Copy,
  Check,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  SITE_SECTIONS,
  preloadSiteImages,
} from './data/siteContent';
import { Header } from './components/Header';
import { HeroAndServices } from './components/HeroAndServices';
import { InteractiveSections } from './components/InteractiveSections';
import { EstimateAndContact } from './components/EstimateAndContact';

export default function App() {
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');
  const [prefilledMessage, setPrefilledMessage] = useState('');

  // Smooth section navigation history & current active section
  const [activeSection, setActiveSection] = useState<string>('top');
  const [previousSection, setPreviousSection] = useState<string | null>(null);
  const [showFloatingNav, setShowFloatingNav] = useState(false);

  // Preload site images on mount for zero image-loading lag
  useEffect(() => {
    preloadSiteImages();
  }, []);

  // Track active section and scroll depth
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingNav(window.scrollY > 360);

      const scrollPosition = window.scrollY + 200;
      for (let i = SITE_SECTIONS.length - 1; i >= 0; i--) {
        const sec = SITE_SECTIONS[i];
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string, fromSectionOverride?: string) => {
    const origin = fromSectionOverride || activeSection;
    if (origin && origin !== sectionId) {
      setPreviousSection(origin);
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGoBackSection = () => {
    const target = previousSection && previousSection !== activeSection ? previousSection : 'services';
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStepSection = (direction: 'prev' | 'next') => {
    const currentIndex = SITE_SECTIONS.findIndex((s) => s.id === activeSection);
    if (currentIndex === -1) return;
    const nextIndex =
      direction === 'prev'
        ? Math.max(0, currentIndex - 1)
        : Math.min(SITE_SECTIONS.length - 1, currentIndex + 1);
    scrollToSection(SITE_SECTIONS[nextIndex].id);
  };

  const handleSelectServiceForEstimate = (
    serviceName: string,
    note?: string,
    fromSection?: string
  ) => {
    setPrefilledService(serviceName);
    if (note) {
      setPrefilledMessage(note);
    }
    scrollToSection('estimate', fromSection || activeSection);
  };

  const handleCopyPhone = () => {
    navigator.clipboard?.writeText(BUSINESS_INFO.phoneDisplay);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const currentSectionIndex = SITE_SECTIONS.findIndex((s) => s.id === activeSection);
  const canStepPrev = currentSectionIndex > 0;
  const canStepNext = currentSectionIndex < SITE_SECTIONS.length - 1;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-x-hidden">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-orange-700 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Header & Sticky Navigation */}
      <Header
        activeSection={activeSection}
        previousSection={previousSection}
        onOpenPhoneModal={() => setPhoneModalOpen(true)}
        onScrollToSection={scrollToSection}
        onGoBackSection={handleGoBackSection}
      />

      {/* Main Content Sections */}
      <main id="main-content" className="flex-1">
        {/* Hero & Services & Trust Strip */}
        <HeroAndServices
          onOpenPhoneModal={() => setPhoneModalOpen(true)}
          onSelectServiceForEstimate={handleSelectServiceForEstimate}
          onScrollToSection={scrollToSection}
        />

        {/* Why Spray Foam, Houston Solutions, 4-Step Process, Trust, FAQ */}
        <InteractiveSections
          onSelectServiceForEstimate={handleSelectServiceForEstimate}
          onOpenPhoneModal={() => setPhoneModalOpen(true)}
        />

        {/* Free Estimate Form, Contact Details, Footer */}
        <EstimateAndContact
          prefilledService={prefilledService}
          prefilledMessage={prefilledMessage}
          previousSection={previousSection}
          onOpenPhoneModal={() => setPhoneModalOpen(true)}
          onScrollToSection={scrollToSection}
          onGoBackSection={handleGoBackSection}
          onSelectServiceForEstimate={handleSelectServiceForEstimate}
        />
      </main>

      {/* DESKTOP FLOATING SECTION NAVIGATOR */}
      {showFloatingNav && (
        <div
          aria-label="Section Navigation"
          className="hidden lg:flex fixed bottom-6 right-6 z-30 items-center gap-1.5 p-1.5 rounded-xl bg-slate-900/95 text-white border border-slate-700/90 shadow-xl backdrop-blur-md"
        >
          <button
            type="button"
            disabled={!canStepPrev}
            onClick={() => handleStepSection('prev')}
            title="Scroll to previous section"
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
            <span>Prev</span>
          </button>

          <button
            type="button"
            disabled={!canStepNext}
            onClick={() => handleStepSection('next')}
            title="Scroll to next section"
            className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:text-white hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
          >
            <span>Next</span>
            <ArrowDown className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
          </button>

          <div className="h-4 w-px bg-slate-700 mx-0.5" aria-hidden="true" />

          <button
            type="button"
            onClick={() => scrollToSection('estimate')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 transition-all cursor-pointer"
          >
            <span>Free Estimate</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM ACTION BAR */}
      <div
        role="region"
        aria-label="Quick mobile contact actions"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2 sm:p-2.5 px-3 sm:px-4 shadow-2xl flex items-center gap-2"
      >
        {showFloatingNav && (
          <button
            type="button"
            onClick={() => handleStepSection('prev')}
            aria-label="Go to previous section"
            className="inline-flex items-center justify-center gap-1 py-3 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300/80 shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-orange-700" aria-hidden="true" />
            <span>Prev</span>
          </button>
        )}

        <a
          href={BUSINESS_INFO.phoneTel}
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold whitespace-nowrap border border-slate-300/90"
        >
          <Phone className="w-3.5 h-3.5 text-orange-700 shrink-0" aria-hidden="true" />
          <span>Call {BUSINESS_INFO.phoneDisplay}</span>
        </a>

        <button
          type="button"
          onClick={() => scrollToSection('estimate')}
          className="flex-[1.25] inline-flex items-center justify-center gap-1.5 py-3 px-3.5 rounded-xl bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 text-white text-xs font-semibold whitespace-nowrap shadow-sm cursor-pointer"
        >
          <span>Free Estimate</span>
          <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
        </button>
      </div>

      {/* PHONE DIALOG MODAL */}
      {phoneModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="phone-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs"
        >
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-200">
              <div>
                <p className="text-xs font-mono text-orange-700 font-semibold">
                  DIRECT PHONE LINE
                </p>
                <h3 id="phone-modal-title" className="text-xl font-semibold text-slate-900 mt-0.5">
                  Contact {BUSINESS_INFO.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPhoneModalOpen(false)}
                aria-label="Close dialog"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                Speak with our team regarding spray foam insulation, attic upgrades, commercial buildings, or new construction projects in Houston, TX.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Phone Number:</span>
                  <span className="font-mono text-base font-semibold text-slate-900">
                    {BUSINESS_INFO.phoneDisplay}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-normal">
                  {BUSINESS_INFO.phoneNote}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-orange-50/80 border border-orange-200/80 text-xs text-orange-950">
                <span className="font-semibold block">Business Hours:</span>
                {BUSINESS_INFO.hoursDisplay}
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 text-white text-xs sm:text-sm font-semibold transition-all"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
                  'Insulation Consultation Inquiry - Houston Spray Foam Insulation'
                )}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors"
              >
                <Mail className="w-4 h-4 text-orange-700" aria-hidden="true" />
                <span>Email Us ({BUSINESS_INFO.email})</span>
              </a>

              <button
                type="button"
                onClick={handleCopyPhone}
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors cursor-pointer"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                    <span>Phone Number Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" aria-hidden="true" />
                    <span>Copy Phone Number</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setPhoneModalOpen(false)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Back to Page</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPhoneModalOpen(false);
                    scrollToSection('estimate');
                  }}
                  className="text-xs font-semibold text-orange-700 hover:text-orange-800 underline underline-offset-4 cursor-pointer"
                >
                  Request a Free Estimate Online
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
