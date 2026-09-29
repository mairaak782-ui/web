import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight, ArrowLeft, Shield, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, SITE_SECTIONS } from '../data/siteContent';

interface HeaderProps {
  activeSection: string;
  previousSection: string | null;
  onOpenPhoneModal: () => void;
  onScrollToSection: (sectionId: string) => void;
  onGoBackSection: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  previousSection,
  onOpenPhoneModal,
  onScrollToSection,
  onGoBackSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  const previousSectionLabel = previousSection
    ? SITE_SECTIONS.find((s) => s.id === previousSection)?.label || 'Previous'
    : null;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm py-0.5'
          : 'bg-white border-b border-slate-200/80 py-0'
      }`}
    >
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] sm:text-xs py-1 px-4 border-b border-slate-800">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium text-slate-200">Houston, Texas</span>
            <span className="text-slate-500 hidden sm:inline">|</span>
            <span className="text-slate-300 hidden sm:inline">Professional Spray Foam &amp; Attic Solutions</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 hidden md:inline">Complimentary On-Site Estimates</span>
            <a
              href={BUSINESS_INFO.phoneTel}
              className="font-mono font-semibold text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-orange-400" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand Wordmark + Back Button */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 shrink-0">
          {scrolled && previousSection && previousSection !== activeSection && (
            <button
              type="button"
              onClick={onGoBackSection}
              title={`Return to ${previousSectionLabel}`}
              aria-label={`Back to ${previousSectionLabel} section`}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 transition-colors cursor-pointer shrink-0 focus-visible:outline-2 focus-visible:outline-orange-700"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-orange-700" aria-hidden="true" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          <a
            href="#top"
            onClick={(e) => handleNavClick(e, 'top')}
            className="flex items-center gap-2.5 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-orange-600 to-slate-900 flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-orange-200" />
            </div>
            <div className="min-w-0">
              <span className="block font-editorial text-base sm:text-lg lg:text-xl font-semibold tracking-tight text-slate-900 group-hover:text-orange-900 transition-colors truncate">
                {BUSINESS_INFO.name}
              </span>
              <span className="block text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-slate-500 -mt-0.5">
                Houston, TX · Residential &amp; Commercial
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium text-slate-600"
        >
          {[
            { id: 'services', label: 'Services' },
            { id: 'why-spray-foam', label: 'Why Spray Foam' },
            { id: 'houston-solutions', label: 'Houston Solutions' },
            { id: 'process', label: 'Process' },
            { id: 'trust', label: 'Why Choose Us' },
            { id: 'faq', label: 'FAQ' },
            { id: 'contact', label: 'Contact' },
          ].map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`transition-all whitespace-nowrap py-1.5 px-1 relative text-sm ${
                  isActive
                    ? 'text-orange-800 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-700 rounded-full animate-in fade-in" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Call CTA & Estimate Action */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={BUSINESS_INFO.phoneTel}
            aria-label={`Call Houston Spray Foam Insulation at ${BUSINESS_INFO.phoneDisplay}`}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl transition-all whitespace-nowrap shrink-0 hover:border-slate-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-700 shrink-0" aria-hidden="true" />
            <span className="hidden md:inline font-mono text-xs sm:text-sm">{BUSINESS_INFO.phoneDisplay}</span>
            <span className="md:hidden font-mono text-xs font-semibold">{BUSINESS_INFO.phoneDisplay}</span>
          </a>

          <a
            href="#estimate"
            onClick={(e) => handleNavClick(e, 'estimate')}
            className="group hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 shadow-sm cta-glow rounded-xl transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700 active:scale-95"
          >
            <span>Get a Free Estimate</span>
            <ArrowRight
              className="w-4 h-4 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-700 active:scale-95"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Navigation Menu
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-orange-700 py-1 px-2.5 rounded-lg bg-slate-100 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Close</span>
            </button>
          </div>

          <div className="flex flex-col space-y-1 text-sm font-medium text-slate-700">
            {[
              { id: 'top', label: 'Home' },
              { id: 'services', label: 'Insulation Services' },
              { id: 'why-spray-foam', label: 'Why Spray Foam' },
              { id: 'houston-solutions', label: 'Houston Solutions' },
              { id: 'process', label: 'Our 4-Step Process' },
              { id: 'trust', label: 'Why Choose Us' },
              { id: 'faq', label: 'Frequently Asked Questions' },
              { id: 'contact', label: 'Contact Information' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`py-3 px-3.5 rounded-xl transition-colors flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-orange-50 text-orange-800 font-semibold border border-orange-200/70'
                    : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col gap-2.5">
            <a
              href="#estimate"
              onClick={(e) => handleNavClick(e, 'estimate')}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-xl shadow-md active:scale-98"
            >
              <span>Request a Free Estimate</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href={BUSINESS_INFO.phoneTel}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-300 font-mono active:scale-98"
            >
              <Phone className="w-4 h-4 text-orange-700" aria-hidden="true" />
              <span>Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
