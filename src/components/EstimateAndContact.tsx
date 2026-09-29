import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  CheckCircle2,
  AlertCircle,
  X,
  Copy,
  Check,
  Building,
  Home,
  Hammer,
  Sparkles,
  Shield,
  Instagram,
  ExternalLink,
} from 'lucide-react';
import {
  BUSINESS_INFO,
  SERVICES_DATA,
  SITE_SECTIONS,
} from '../data/siteContent';
import { DrFoamBrandLogo } from './DrFoamBrandLogo';

interface EstimateAndContactProps {
  prefilledService: string;
  prefilledZip?: string;
  prefilledMessage: string;
  previousSection: string | null;
  onOpenPhoneModal: () => void;
  onScrollToSection: (sectionId: string) => void;
  onGoBackSection: () => void;
  onSelectServiceForEstimate: (serviceName: string, note?: string, fromSection?: string) => void;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  serviceNeeded: string;
  cityOrTown: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
}

export const EstimateAndContact: React.FC<EstimateAndContactProps> = ({
  prefilledService,
  prefilledMessage,
  previousSection,
  onOpenPhoneModal,
  onScrollToSection,
  onGoBackSection,
  onSelectServiceForEstimate,
}) => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'Residential Home',
    serviceNeeded: 'Spray Foam Insulation',
    cityOrTown: 'Barrie',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submittedRecord, setSubmittedRecord] = useState<(FormState & { referenceId: string; submittedAt: string }) | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'standards' | null>(null);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: prefilledService }));
    }
  }, [prefilledService]);

  useEffect(() => {
    if (prefilledMessage) {
      setFormData((prev) => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledMessage]);

  const previousSectionLabel = previousSection
    ? SITE_SECTIONS.find((s) => s.id === previousSection)?.label || 'Previous Section'
    : 'Services';

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const digitsOnly = formData.phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      nextErrors.phone = 'Please enter a valid 10-digit phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const refNum = `DRF-${Math.floor(100000 + Math.random() * 900000)}`;
    const timestamp = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });

    setSubmittedRecord({
      ...formData,
      referenceId: refNum,
      submittedAt: timestamp,
    });
  };

  const handleCopyConfirmation = () => {
    if (!submittedRecord) return;
    const summaryText = [
      `Estimate Request Reference: ${submittedRecord.referenceId}`,
      `Company: ${BUSINESS_INFO.name}`,
      `Name: ${submittedRecord.fullName}`,
      `Phone: ${submittedRecord.phone}`,
      `Email: ${submittedRecord.email}`,
      `Location / Town: ${submittedRecord.cityOrTown}`,
      `Property Type: ${submittedRecord.propertyType}`,
      `Service Needed: ${submittedRecord.serviceNeeded}`,
      `Message / Details: ${submittedRecord.message || 'N/A'}`,
    ].join('\n');

    navigator.clipboard?.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <>
      {/* SECTION 9 & 12: ESTIMATE / LEAD FORM SECTION */}
      <section
        id="estimate"
        aria-labelledby="estimate-heading"
        className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white border-b border-slate-800 relative overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Navigation bar */}
          <div className="flex items-center justify-between pb-8 border-b border-slate-800 mb-10">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                Online Quote &amp; Consultation
              </span>
            </div>

            {previousSection && previousSection !== 'estimate' && (
              <button
                type="button"
                onClick={onGoBackSection}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to {previousSectionLabel}</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT COLUMN: FORM CONTEXT & VALUE */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  Barrie · Muskoka · North Bay
                </p>
                <h2
                  id="estimate-heading"
                  className="mt-2 text-2xl sm:text-4xl font-bold text-white tracking-tight"
                >
                  Request a Free Estimate
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Tell us about your property and insulation goals. We will review your project requirements and connect with a clear, tailored recommendation.
                </p>
              </div>

              {/* Hook Card */}
              <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                <p className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                  The Dr. Foam Guarantee of Clarity
                </p>
                <p className="mt-2 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  &ldquo;Keep your home warm in winter, cool in summer, and your bills steady.&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-emerald-800/40 flex items-center justify-between text-xs text-emerald-300">
                  <span>Fast Response</span>
                  <span>•</span>
                  <span>No High Pressure</span>
                  <span>•</span>
                  <span>Direct Consultation</span>
                </div>
              </div>

              {/* Direct Phone Assistance */}
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-700/80 flex items-center justify-center text-white shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400">Prefer to speak right now?</p>
                  <a
                    href={BUSINESS_INFO.phoneTel}
                    className="text-base sm:text-lg font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {BUSINESS_INFO.phoneNote}
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: LEAD / QUOTE FORM */}
            <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl relative">
              {submittedRecord ? (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div>
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                      REF #{submittedRecord.referenceId}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-2">
                      Estimate Request Received!
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                      Thank you, <span className="font-semibold text-white">{submittedRecord.fullName}</span>. Your estimate request has been logged. Dr. Foam will review your details for your {submittedRecord.propertyType} project in {submittedRecord.cityOrTown}.
                    </p>
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
                    <p><span className="text-slate-500">Service:</span> {submittedRecord.serviceNeeded}</p>
                    <p><span className="text-slate-500">Property:</span> {submittedRecord.propertyType} ({submittedRecord.cityOrTown})</p>
                    <p><span className="text-slate-500">Phone:</span> {submittedRecord.phone}</p>
                    <p><span className="text-slate-500">Email:</span> {submittedRecord.email}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCopyConfirmation}
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors"
                    >
                      {copiedSummary ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedSummary ? 'Summary Copied' : 'Copy Request Summary'}</span>
                    </button>

                    <a
                      href={`mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
                        `Estimate Request - ${submittedRecord.referenceId} (${submittedRecord.fullName})`
                      )}&body=${encodeURIComponent(
                        `Hello Dr. Foam team,\n\nI just submitted an estimate request:\nRef: ${submittedRecord.referenceId}\nName: ${submittedRecord.fullName}\nPhone: ${submittedRecord.phone}\nService: ${submittedRecord.serviceNeeded}\nLocation: ${submittedRecord.cityOrTown}\n\nDetails: ${submittedRecord.message}`
                      )}`}
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Direct Email Copy</span>
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedRecord(null);
                      setFormData({
                        fullName: '',
                        phone: '',
                        email: '',
                        propertyType: 'Residential Home',
                        serviceNeeded: 'Spray Foam Insulation',
                        cityOrTown: 'Barrie',
                        message: '',
                      });
                    }}
                    className="text-xs text-slate-400 hover:text-white underline cursor-pointer pt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* FULL NAME */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        placeholder="John Smith"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-[11px] text-red-400">{errors.fullName}</p>
                      )}
                    </div>

                    {/* PHONE */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone Number <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder="705-555-0123"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-[11px] text-red-400">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* EMAIL */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address <span className="text-emerald-400">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-red-400">{errors.email}</p>
                      )}
                    </div>

                    {/* CITY / TOWN */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Location / Town <span className="text-slate-500">(Ontario)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.cityOrTown}
                        onChange={(e) =>
                          setFormData({ ...formData, cityOrTown: e.target.value })
                        }
                        placeholder="e.g. Barrie, Muskoka, North Bay"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* PROPERTY TYPE */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Property Type
                      </label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) =>
                          setFormData({ ...formData, propertyType: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="Residential Home">Residential Home</option>
                        <option value="Cottage / Waterfront">Cottage / Waterfront Retreat</option>
                        <option value="Commercial / Industrial">Commercial / Industrial Building</option>
                        <option value="Agricultural / Barn / Shop">Agricultural Barn / Workshop</option>
                        <option value="New Custom Construction">New Custom Construction</option>
                        <option value="Renovation / Addition">Renovation / Addition</option>
                        <option value="Other">Other Structure</option>
                      </select>
                    </div>

                    {/* SERVICE NEEDED */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Service Needed
                      </label>
                      <select
                        value={formData.serviceNeeded}
                        onChange={(e) =>
                          setFormData({ ...formData, serviceNeeded: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="Spray Foam Insulation">Spray Foam Insulation</option>
                        <option value="Attic Insulation & Air Sealing">Attic Insulation &amp; Air Sealing</option>
                        <option value="Residential & Cottage Insulation">Residential &amp; Cottage Insulation</option>
                        <option value="Commercial & Agricultural Insulation">Commercial &amp; Agricultural Insulation</option>
                        <option value="Basement & Crawlspace Encapsulation">Basement &amp; Crawlspace</option>
                        <option value="New Construction Insulation">New Construction Insulation</option>
                        <option value="Not Sure / Need Assessment">Not Sure / Need Assessment</option>
                      </select>
                    </div>
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Project Notes / Scope Details <span className="text-slate-500">(Optional)</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Briefly describe what areas you want insulated (e.g. attic, crawlspace, whole cottage, shop)..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none"
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 hover:from-emerald-300 hover:to-emerald-400 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Request a Free Estimate</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>

                  <p className="text-[11px] text-slate-400 text-center">
                    Direct inquiries go to <span className="text-slate-300 font-mono">{BUSINESS_INFO.email}</span>. No spam.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10: VERIFIED CONTACT SECTION */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Get in Touch
            </p>
            <h2
              id="contact-heading"
              className="mt-2 text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight"
            >
              Contact Dr Foam Insulation Ltd.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Reach out directly to discuss insulation solutions for your home, cottage, or business in Ontario.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-emerald-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-4">Phone Consultation</h3>
                <p className="text-xs text-slate-500 mt-1">Direct inquiries &amp; estimate booking</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="text-base font-bold text-emerald-700 hover:text-emerald-800 hover:underline block"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-emerald-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-4">Email</h3>
                <p className="text-xs text-slate-500 mt-1">Send blueprint drawings or notes</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 hover:underline break-all block"
                >
                  {BUSINESS_INFO.email}
                </a>
              </div>
            </div>

            {/* Service Territory Card */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-emerald-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-4">Service Corridor</h3>
                <p className="text-xs text-slate-500 mt-1">Ontario regional coverage</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-sm font-bold text-slate-900">
                  {BUSINESS_INFO.locationDisplay}
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Muskoka · Parry Sound · Central ON
                </p>
              </div>
            </div>

            {/* Hours & Instagram */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-emerald-300 transition-colors">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-4">Operating Hours</h3>
                <p className="text-xs text-slate-500 mt-1">Monday – Saturday</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-xs font-semibold text-slate-800">
                  7:00 AM – 6:00 PM
                </p>
                <a
                  href={BUSINESS_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-emerald-700 hover:underline font-bold mt-1 inline-flex items-center gap-1"
                >
                  <Instagram className="w-3 h-3" />
                  <span>{BUSINESS_INFO.instagramHandle}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Service Area Badges */}
          <div className="mt-10 p-6 rounded-2xl bg-slate-100/80 border border-slate-200">
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
              Serving Communities Across Ontario:
            </p>
            <div className="flex flex-wrap gap-2">
              {BUSINESS_INFO.serviceCoverageAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-white text-slate-800 font-medium px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-4">
              <DrFoamBrandLogo size="md" lightText={true} />

              <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
                &ldquo;Keep your home warm in winter, cool in summer, and your bills steady.&rdquo; Residential and commercial spray foam insulation solutions from Barrie to North Bay, ON.
              </p>

              <div className="space-y-1.5 text-xs text-slate-300">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Barrie to North Bay, Ontario, Canada</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <a href={BUSINESS_INFO.phoneTel} className="hover:text-white font-semibold">
                    {BUSINESS_INFO.phoneDisplay}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="hover:text-white">
                    {BUSINESS_INFO.email}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-emerald-400" />
                  <a
                    href={BUSINESS_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white text-emerald-400"
                  >
                    {BUSINESS_INFO.instagramHandle}
                  </a>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white">
                Navigation
              </p>
              <ul className="space-y-2">
                {SITE_SECTIONS.map((sec) => (
                  <li key={sec.id}>
                    <button
                      type="button"
                      onClick={() => onScrollToSection(sec.id)}
                      className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                    >
                      {sec.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white">
                Services
              </p>
              <ul className="space-y-2">
                {SERVICES_DATA.map((svc) => (
                  <li key={svc.id}>
                    <button
                      type="button"
                      onClick={() => onSelectServiceForEstimate(svc.name, `Footer inquiry for ${svc.name}`)}
                      className="hover:text-emerald-400 transition-colors cursor-pointer text-left"
                    >
                      {svc.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regional Coverage */}
            <div className="space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-white">
                Ontario Coverage
              </p>
              <ul className="space-y-1.5 text-[11px] text-slate-400">
                <li>• Barrie &amp; Innisfil</li>
                <li>• Orillia &amp; Severn</li>
                <li>• Muskoka &amp; Bracebridge</li>
                <li>• Huntsville &amp; Lake of Bays</li>
                <li>• Parry Sound &amp; Georgian Bay</li>
                <li>• North Bay &amp; Callander</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} Dr Foam Insulation Ltd. All rights reserved. Website: {BUSINESS_INFO.domain}
            </p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setLegalModalType('privacy')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setLegalModalType('terms')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setLegalModalType('standards')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Service Standards
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* LEGAL / SERVICE STANDARDS MODAL */}
      {legalModalType && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="bg-slate-900 border border-slate-700 text-slate-200 rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">
                {legalModalType === 'privacy' && 'Privacy Policy'}
                {legalModalType === 'terms' && 'Terms of Service'}
                {legalModalType === 'standards' && 'Dr. Foam Service Standards'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModalType(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-xs leading-relaxed text-slate-300">
              {legalModalType === 'privacy' && (
                <>
                  <p>
                    Dr Foam Insulation Ltd. respects your privacy. Any personal information provided through our estimate forms, email inquiries, or phone consultations is used solely for project assessment, quotation, and direct service communication.
                  </p>
                  <p>
                    We do not sell, rent, or distribute your personal contact information to external third parties or marketing lists.
                  </p>
                </>
              )}

              {legalModalType === 'terms' && (
                <>
                  <p>
                    All estimate requests submitted through this website constitute preliminary consultations and do not form a binding contract until formal project specifications, surface inspections, and work orders are agreed upon in writing.
                  </p>
                  <p>
                    Insulation performance is subject to existing building construction, structural air barriers, and overall building envelope integrity.
                  </p>
                </>
              )}

              {legalModalType === 'standards' && (
                <>
                  <p>
                    Dr Foam Insulation Ltd. is committed to providing high-quality residential and commercial spray foam insulation across the Barrie-to-North Bay Ontario corridor.
                  </p>
                  <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                    <li>Accurate, transparent insulation recommendations.</li>
                    <li>Quality-certified foam formulations for Canadian climate demands.</li>
                    <li>Clean, professional on-site installation and property care.</li>
                    <li>No high-pressure sales tactics.</li>
                  </ul>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setLegalModalType(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
