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
  Instagram,
  ExternalLink,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  SITE_SECTIONS,
  IMAGES,
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
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-700 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none"
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

        {/* Why Spray Foam, Ontario Solutions, 4-Step Process, Trust, FAQ */}
        <InteractiveSections
          onSelectServiceForEstimate={handleSelectServiceForEstimate}
          onOpenPhoneModal={() => setPhoneModalOpen(true)}
          onScrollToSection={scrollToSection}
        />

        {/* Lead Quote Form & Contact Section */}
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

      {/* FLOATING SECTION NAVIGATION ELEVATOR */}
      {showFloatingNav && (
        <aside
          aria-label="Floating section navigation"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-30 flex flex-col items-end gap-2 animate-in fade-in duration-300"
        >
          {/* Active section capsule */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-lg border border-slate-700 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              {SITE_SECTIONS.find((s) => s.id === activeSection)?.label || 'Overview'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900/95 backdrop-blur-md p-1.5 rounded-2xl shadow-xl border border-slate-700 text-white">
            {previousSection && previousSection !== activeSection && (
              <button
                type="button"
                onClick={handleGoBackSection}
                className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-700 text-emerald-400 hover:text-white transition-all cursor-pointer"
                title="Return to previous section"
                aria-label="Return to previous section"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              disabled={!canStepPrev}
              onClick={() => handleStepSection('prev')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                canStepPrev
                  ? 'hover:bg-slate-800 text-slate-200'
                  : 'opacity-30 cursor-not-allowed text-slate-500'
              }`}
              title="Previous section"
              aria-label="Previous section"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            <button
              type="button"
              disabled={!canStepNext}
              onClick={() => handleStepSection('next')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                canStepNext
                  ? 'hover:bg-slate-800 text-slate-200'
                  : 'opacity-30 cursor-not-allowed text-slate-500'
              }`}
              title="Next section"
              aria-label="Next section"
            >
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('estimate', activeSection)}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer ml-1"
            >
              Estimate
            </button>
          </div>
        </aside>
      )}

      {/* MOBILE PERSISTENT QUICK-ACTION BAR */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 flex items-center gap-3">
        <a
          href={BUSINESS_INFO.phoneTel}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-bold text-xs"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
          <span>Call 705-733-1163</span>
        </a>

        <button
          type="button"
          onClick={() => scrollToSection('estimate', activeSection)}
          className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-400 text-slate-950 font-bold text-xs shadow-md"
        >
          <span>Get Free Estimate</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* PHONE CONSULTATION MODAL */}
      {phoneModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-slate-900 border border-slate-700 text-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-white p-0.5 shadow-md overflow-hidden shrink-0 ring-1 ring-emerald-500/40">
                  <img
                    src={IMAGES.logo}
                    alt="Dr. Foam Logo"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white leading-none">
                    Call Dr. Foam
                  </h3>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">Barrie to North Bay</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPhoneModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-center py-2 space-y-2">
              <p className="text-xs text-slate-400 font-medium">
                Barrie to North Bay, ON Consultation Line
              </p>
              <p className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">
                {BUSINESS_INFO.phoneDisplay}
              </p>
              <p className="text-xs text-slate-400">
                {BUSINESS_INFO.hoursDisplay}
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Directly Now</span>
              </a>

              <button
                type="button"
                onClick={handleCopyPhone}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Phone Number Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span>Copy Phone Number</span>
                  </>
                )}
              </button>

              <a
                href={`mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
                  'Insulation Consultation Inquiry - Dr Foam Insulation Ltd.'
                )}`}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs border border-slate-800 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>Email {BUSINESS_INFO.email}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
