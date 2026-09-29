import React, { useState, useEffect } from 'react';
import {
  Phone,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  Shield,
  Sparkles,
  Mail,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import { BUSINESS_INFO, SITE_SECTIONS } from '../data/siteContent';
import { DrFoamBrandLogo } from './DrFoamBrandLogo';

interface HeaderProps {
  activeSection: string;
  previousSection: string | null;
  onOpenPhoneModal: () => void;
  onScrollToSection: (sectionId: string, fromSectionOverride?: string) => void;
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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', sectionId: 'top' },
    { label: 'Services', sectionId: 'services' },
    { label: 'Why Spray Foam', sectionId: 'why-spray-foam' },
    { label: 'Ontario Properties', sectionId: 'ontario-solutions' },
    { label: 'Our Process', sectionId: 'process' },
    { label: 'Why Dr. Foam', sectionId: 'trust' },
    { label: 'FAQ', sectionId: 'faq' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    onScrollToSection(sectionId, activeSection);
  };

  const getPreviousLabel = (): string => {
    if (!previousSection) return 'Previous Section';
    const found = SITE_SECTIONS.find((s) => s.id === previousSection);
    return found ? found.label : 'Previous Section';
  };

  return (
    <>
      {/* TOP EMERGENCY & TERRITORY STRIP */}
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800 transition-colors">
        <div className="max-w-[1280px] mx-auto flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-4 font-medium flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Barrie to North Bay, ON
            </span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="hidden md:inline-block text-slate-300">
              Residential &amp; Commercial Spray Foam Specialists
            </span>
            <span className="hidden lg:inline-block text-slate-500">|</span>
            <span className="hidden lg:inline-block text-slate-400 font-mono text-[11px]">
              {BUSINESS_INFO.domain}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5 ml-auto text-xs">
            <a
              href={`mailto:${BUSINESS_INFO.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
              title="Email Dr. Foam"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{BUSINESS_INFO.email}</span>
            </a>
            <a
              href={BUSINESS_INFO.phoneTel}
              className="inline-flex items-center gap-1.5 font-bold text-white bg-emerald-700/80 hover:bg-emerald-600 px-3 py-1 rounded-md transition-all shadow-sm group"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-300 group-hover:scale-110 transition-transform" />
              <span>{BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* MAIN STICKY NAVIGATION BAR */}
      <header
        role="banner"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-slate-800'
            : 'bg-slate-900 border-b border-slate-800/80'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            {/* BRAND LOGO BADGE WITH INSTAGRAM PROFILE PIC */}
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('top');
              }}
              className="group flex items-center focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded-xl p-1"
              aria-label="Dr Foam Insulation Ltd. Home"
            >
              <DrFoamBrandLogo size="md" lightText={true} />
            </a>

            {/* DESKTOP NAVIGATION LINKS */}
            <nav
              aria-label="Main Navigation"
              className="hidden xl:flex items-center space-x-1"
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <button
                    key={item.sectionId}
                    type="button"
                    onClick={() => handleNavClick(item.sectionId)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                      isActive
                        ? 'text-emerald-400 bg-slate-800 border border-slate-700 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* HEADER ACTIONS */}
            <div className="hidden lg:flex items-center gap-3">
              {previousSection && previousSection !== activeSection && (
                <button
                  type="button"
                  onClick={onGoBackSection}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
                  title={`Return back to ${getPreviousLabel()}`}
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Back to {getPreviousLabel()}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => handleNavClick('estimate')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 hover:from-emerald-300 hover:to-emerald-400 shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <span>Free Estimate</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>
            </div>

            {/* MOBILE MENU TOGGLE BUTTON */}
            <div className="flex items-center gap-2 xl:hidden">
              <button
                type="button"
                onClick={() => handleNavClick('estimate')}
                className="inline-flex sm:hidden items-center px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-sm"
              >
                Estimate
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-colors"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-slate-950 border-b border-slate-800 shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-4 pt-3 pb-6 space-y-1.5 max-w-[1280px] mx-auto">
              {/* Service territory quick tag */}
              <div className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs text-slate-300 mb-2">
                <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                  <MapPin className="w-3.5 h-3.5" /> Barrie to North Bay, ON
                </span>
                <span className="font-mono text-slate-400">{BUSINESS_INFO.domain}</span>
              </div>

              {navItems.map((item) => {
                const isActive = activeSection === item.sectionId;
                return (
                  <button
                    key={item.sectionId}
                    type="button"
                    onClick={() => handleNavClick(item.sectionId)}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-slate-800 text-emerald-400 font-bold border border-slate-700'
                        : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                  </button>
                );
              })}

              <div className="pt-4 mt-2 border-t border-slate-800/80 space-y-2.5">
                <button
                  type="button"
                  onClick={() => handleNavClick('estimate')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 shadow-lg shadow-emerald-500/20 transition-colors"
                >
                  <span>Request Free Estimate</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>

                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>

                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{BUSINESS_INFO.email}</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
