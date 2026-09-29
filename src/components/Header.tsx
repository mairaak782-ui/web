import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowRight, ArrowLeft } from 'lucide-react';
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
      className={`sticky top-0 z-40 w-full transition-all duration-150 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm'
          : 'bg-white border-b border-slate-200/80'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-3 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand Wordmark + Optional Contextual Smooth Back Button */}
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
            className="font-editorial text-base sm:text-xl font-semibold tracking-tight text-slate-900 truncate focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-700"
          >
            {BUSINESS_INFO.name}
          </a>
        </div>

        {/* Zone 2: Clean Desktop Navigation Links with Active Indicator */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium text-slate-600"
        >
          {[
            { id: 'services', label: 'Services' },
            { id: 'why-insulation', label: 'Why Insulation' },
            { id: 'about', label: 'About' },
            { id: 'service-areas', label: 'Service Areas' },
            { id: 'reviews', label: 'Reviews' },
            { id: 'contact', label: 'Contact' },
          ].map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`transition-colors whitespace-nowrap py-1 border-b-2 focus-visible:outline-2 focus-visible:outline-orange-700 ${
                  isActive
                    ? 'text-slate-900 font-semibold border-orange-700'
                    : 'border-transparent hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary Conversion Actions (Call + Attractive Free Estimate CTA) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenPhoneModal}
            aria-label={`Call ${BUSINESS_INFO.name}: ${BUSINESS_INFO.phoneDisplay}`}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-2 sm:px-3.5 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200/90 border border-slate-300/90 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-700 shrink-0" aria-hidden="true" />
            <span className="hidden md:inline font-mono text-xs sm:text-sm">{BUSINESS_INFO.phoneDisplay}</span>
            <span className="md:hidden text-xs font-semibold">Call</span>
          </button>

          <a
            href="#estimate"
            onClick={(e) => handleNavClick(e, 'estimate')}
            className="group hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 shadow-sm shadow-orange-950/20 inset-ring inset-ring-white/20 rounded-lg transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
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
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-slate-200 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-700"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer with Smooth Back & Quick Section Jump */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Quick Section Navigation
            </span>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-orange-700 py-1 px-2 rounded-md bg-slate-100 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Close Menu</span>
            </button>
          </div>

          <nav aria-label="Mobile Navigation" className="grid grid-cols-1 sm:grid-cols-2 gap-1">
            {[
              { id: 'top', label: 'Home (Top)' },
              { id: 'services', label: 'Insulation Services' },
              { id: 'problem-solution', label: 'Comfort Diagnosis' },
              { id: 'why-insulation', label: 'Why Proper Insulation' },
              { id: 'about', label: 'About & 4-Step Process' },
              { id: 'before-after', label: 'Before & After Concept' },
              { id: 'service-areas', label: 'Houston Service Areas' },
              { id: 'reviews', label: 'Reviews & Gallery' },
              { id: 'faq', label: 'Common Questions (FAQ)' },
              { id: 'contact', label: 'Contact Information' },
            ].map((item) => {
              const isCurrent = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`px-3.5 py-3 text-sm font-medium rounded-lg transition-colors flex items-center justify-between ${
                    isCurrent
                      ? 'bg-orange-50 text-orange-800 font-semibold border border-orange-200/80'
                      : 'text-slate-800 hover:text-orange-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                </a>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col gap-2.5">
            <a
              href="#estimate"
              onClick={(e) => handleNavClick(e, 'estimate')}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-xl shadow-md transition-all whitespace-nowrap"
            >
              <span>GET A FREE ESTIMATE</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPhoneModal();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 rounded-xl transition-colors whitespace-nowrap cursor-pointer"
            >
              <Phone className="w-4 h-4 text-orange-700" aria-hidden="true" />
              <span>CALL NOW: {BUSINESS_INFO.phoneDisplay}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
