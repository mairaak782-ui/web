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
} from 'lucide-react';
import {
  BUSINESS_INFO,
  VERIFIED_SERVICES,
  SERVICE_AREAS,
  SITE_SECTIONS,
} from '../data/siteContent';

interface EstimateAndContactProps {
  prefilledService: string;
  prefilledZip: string;
  prefilledMessage: string;
  previousSection: string | null;
  onOpenPhoneModal: () => void;
  onScrollToSection: (sectionId: string) => void;
  onGoBackSection: () => void;
  onSelectAreaForEstimate: (areaName: string, zipSample: string, fromSection?: string) => void;
  onSelectServiceForEstimate: (serviceName: string, note?: string, fromSection?: string) => void;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  propertyType: string;
  serviceNeeded: string;
  zipCode: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  zipCode?: string;
}

export const EstimateAndContact: React.FC<EstimateAndContactProps> = ({
  prefilledService,
  prefilledZip,
  prefilledMessage,
  previousSection,
  onOpenPhoneModal,
  onScrollToSection,
  onGoBackSection,
  onSelectAreaForEstimate,
  onSelectServiceForEstimate,
}) => {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'Residential Home',
    serviceNeeded: 'Attic & Roof Insulation',
    zipCode: '',
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
    if (prefilledZip) {
      setFormData((prev) => ({ ...prev, zipCode: prefilledZip }));
    }
  }, [prefilledZip]);

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
      nextErrors.phone = 'Please enter a valid 10-digit US phone number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    const zipRegex = /^\d{5}(-\d{4})?$/;
    if (!zipRegex.test(formData.zipCode.trim())) {
      nextErrors.zipCode = 'Please enter a valid 5-digit ZIP code (e.g., 77008).';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const refNum = `HIS-${Math.floor(100000 + Math.random() * 900000)}`;
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
      `Business: ${BUSINESS_INFO.name}`,
      `Name: ${submittedRecord.fullName}`,
      `Phone: ${submittedRecord.phone}`,
      `Email: ${submittedRecord.email}`,
      `Property Type: ${submittedRecord.propertyType}`,
      `Service Needed: ${submittedRecord.serviceNeeded}`,
      `ZIP Code: ${submittedRecord.zipCode}`,
      `Message: ${submittedRecord.message || 'N/A'}`,
    ].join('\n');

    navigator.clipboard?.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <>
      {/* SECTION 16: FREE ESTIMATE SECTION */}
      <section
        id="estimate"
        aria-labelledby="estimate-heading"
        className="py-16 sm:py-20 lg:py-28 bg-slate-900 text-white border-b border-slate-800"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Smooth Contextual Back Button Bar */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <button
              type="button"
              onClick={onGoBackSection}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-orange-400" aria-hidden="true" />
              <span>Back to {previousSectionLabel}</span>
            </button>

            <button
              type="button"
              onClick={() => onScrollToSection('top')}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowUp className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
              <span>Back to Top</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Supporting Copy & Direct Phone CTA */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-xs font-medium text-orange-400">
                  Complimentary Consultation · Houston &amp; Southeast Texas
                </p>
                <h2
                  id="estimate-heading"
                  className="mt-2.5 text-2xl sm:text-4xl font-semibold text-white tracking-tight"
                >
                  Ready to Improve Your Home’s Comfort?
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Tell us about your residential, commercial, or industrial property. We will review your insulation needs, answer your questions, and arrange a complimentary estimate with no obligation.
                </p>
              </div>

              {/* Attractive Phone CTA Card Beside Form */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-800/90 border border-slate-700/90 space-y-5 shadow-lg">
                <div>
                  <p className="text-xs text-orange-400 font-medium">
                    Prefer to Speak Directly?
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-white">
                    Call {BUSINESS_INFO.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Reach our team during normal business hours (Monday – Friday) to discuss attic, wall cavity, spray foam, or floor insulation for your property.
                  </p>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={onOpenPhoneModal}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-4 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-sm transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-400"
                  >
                    <Phone className="w-4 h-4 text-orange-700 shrink-0" aria-hidden="true" />
                    <span className="font-mono">CALL NOW: {BUSINESS_INFO.phoneDisplay}</span>
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-700/80 flex flex-col gap-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-400">Verified Email:</span>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="font-mono text-white hover:text-orange-400 underline underline-offset-4 truncate"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-400">Office Hours:</span>
                    <span>Monday – Friday</span>
                  </div>
                </div>
              </div>

              {/* What to Expect Summary */}
              <div className="space-y-3 text-sm text-slate-300 border-t border-slate-800 pt-6">
                <p className="font-semibold text-white">What happens after you submit:</p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  01 · We review your property type, ZIP code, and insulation goals.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  02 · We follow up by phone or email to discuss your project and schedule an assessment.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  03 · You receive a clear recommendation for the areas that will benefit your property most.
                </p>
              </div>
            </div>

            {/* Right Column: Estimate Request Form */}
            <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl border border-slate-200 p-5 sm:p-8 lg:p-10 shadow-xl">
              {!submittedRecord ? (
                <form onSubmit={handleSubmit} noValidate aria-label="Request a Free Estimate">
                  <div className="pb-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
                        Request Your Free Insulation Estimate
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-600">
                        Complete the short form below. Fields marked with * are required.
                      </p>
                    </div>
                    <span className="text-xs text-orange-800 bg-orange-50 border border-orange-200/80 px-2.5 py-1 rounded-md font-mono self-start sm:self-auto">
                      Free Estimate
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="estimate-full-name"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="estimate-full-name"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData({ ...formData, fullName: e.target.value });
                          if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                        }}
                        placeholder="e.g., Michael Carter"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'error-full-name' : undefined}
                        className={`w-full px-3.5 py-3 text-sm rounded-lg border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-2 focus:outline-orange-700 transition-colors ${
                          errors.fullName ? 'border-red-600' : 'border-slate-300'
                        }`}
                      />
                      {errors.fullName && (
                        <p id="error-full-name" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="estimate-phone"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="estimate-phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        placeholder="e.g., (713) 555-0192"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'error-phone' : undefined}
                        className={`w-full px-3.5 py-3 text-sm rounded-lg border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-2 focus:outline-orange-700 transition-colors ${
                          errors.phone ? 'border-red-600' : 'border-slate-300'
                        }`}
                      />
                      {errors.phone && (
                        <p id="error-phone" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="estimate-email"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="estimate-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        placeholder="you@example.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? 'error-email' : undefined}
                        className={`w-full px-3.5 py-3 text-sm rounded-lg border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-2 focus:outline-orange-700 transition-colors ${
                          errors.email ? 'border-red-600' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && (
                        <p id="error-email" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* ZIP Code */}
                    <div>
                      <label
                        htmlFor="estimate-zip"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Property ZIP Code *
                      </label>
                      <input
                        id="estimate-zip"
                        name="zipCode"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        required
                        value={formData.zipCode}
                        onChange={(e) => {
                          setFormData({ ...formData, zipCode: e.target.value });
                          if (errors.zipCode) setErrors({ ...errors, zipCode: undefined });
                        }}
                        placeholder="e.g., 77008"
                        aria-invalid={Boolean(errors.zipCode)}
                        aria-describedby={errors.zipCode ? 'error-zip' : undefined}
                        className={`w-full px-3.5 py-3 text-sm font-mono rounded-lg border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-2 focus:outline-orange-700 transition-colors ${
                          errors.zipCode ? 'border-red-600' : 'border-slate-300'
                        }`}
                      />
                      {errors.zipCode && (
                        <p id="error-zip" className="mt-1.5 text-xs text-red-600 flex items-center gap-1 font-sans">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.zipCode}</span>
                        </p>
                      )}
                    </div>

                    {/* Property Type */}
                    <div>
                      <label
                        htmlFor="estimate-property-type"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Property Type
                      </label>
                      <select
                        id="estimate-property-type"
                        name="propertyType"
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-3.5 py-3 text-sm rounded-lg border border-slate-300 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-2 focus:outline-orange-700 transition-colors"
                      >
                        <option value="Residential Home">Residential Home</option>
                        <option value="Commercial Building">Commercial Building</option>
                        <option value="Industrial Facility">Industrial Facility</option>
                        <option value="Multi-Family / Townhome">Multi-Family / Townhome</option>
                      </select>
                    </div>

                    {/* Service Needed */}
                    <div>
                      <label
                        htmlFor="estimate-service-needed"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Service Needed
                      </label>
                      <select
                        id="estimate-service-needed"
                        name="serviceNeeded"
                        value={formData.serviceNeeded}
                        onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                        className="w-full px-3.5 py-3 text-sm rounded-lg border border-slate-300 bg-slate-50/50 text-slate-900 focus:bg-white focus:outline-2 focus:outline-orange-700 transition-colors"
                      >
                        <option value="Attic & Roof Insulation">Attic, Roof &amp; Loft Insulation</option>
                        <option value="Wall Cavity Insulation">Cavity &amp; Interior Wall Insulation</option>
                        <option value="Spray Foam Insulation">Spray Foam Insulation</option>
                        <option value="Floor & Foundation Insulation">Floor, Foundation &amp; Crawl Space Insulation</option>
                        <option value="Removal & Radiant Barriers">Insulation Removal &amp; Radiant Barrier</option>
                        <option value="Not Sure — Recommend a Solution">Not Sure — Need Professional Assessment</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="estimate-message"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Project Details or Comfort Issues (Optional)
                      </label>
                      <textarea
                        id="estimate-message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about warm rooms, attic condition, square footage, or questions you would like us to cover..."
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-2 focus:outline-orange-700 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mt-7 pt-5 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Your contact details are used solely to respond to your insulation estimate inquiry.
                    </p>
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 text-sm font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-xl shadow-md shadow-orange-950/20 transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-700"
                    >
                      <span>REQUEST A FREE ESTIMATE</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-4 space-y-6" role="status" aria-live="polite">
                  <div className="flex items-start gap-3.5 pb-5 border-b border-slate-200">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-mono text-slate-500">
                        ESTIMATE REQUEST LOGGED · REF {submittedRecord.referenceId}
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold text-slate-900">
                        Thank You, {submittedRecord.fullName}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                        Your estimate inquiry for <strong className="text-slate-900">{submittedRecord.serviceNeeded}</strong> in ZIP code <strong className="font-mono text-slate-900">{submittedRecord.zipCode}</strong> has been prepared.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between py-1 border-b border-slate-200/70">
                      <span className="text-slate-500">Property Type:</span>
                      <span className="font-medium text-slate-900">{submittedRecord.propertyType}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/70">
                      <span className="text-slate-500">Requested Service:</span>
                      <span className="font-medium text-slate-900">{submittedRecord.serviceNeeded}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-200/70">
                      <span className="text-slate-500">Contact Phone &amp; Email:</span>
                      <span className="font-mono text-slate-900">
                        {submittedRecord.phone} · {submittedRecord.email}
                      </span>
                    </div>
                    {submittedRecord.message && (
                      <div className="pt-1">
                        <span className="text-slate-500 block">Notes:</span>
                        <p className="mt-1 text-slate-800">{submittedRecord.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={`mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
                        `Free Estimate Request (${submittedRecord.referenceId}) - ${submittedRecord.serviceNeeded}`
                      )}&body=${encodeURIComponent(
                        `Hello Houston Insulation Service,\n\nI would like to request a free estimate:\n\nName: ${submittedRecord.fullName}\nPhone: ${submittedRecord.phone}\nEmail: ${submittedRecord.email}\nProperty Type: ${submittedRecord.propertyType}\nService Needed: ${submittedRecord.serviceNeeded}\nZIP Code: ${submittedRecord.zipCode}\nNotes: ${submittedRecord.message || 'N/A'}\n`
                      )}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-orange-700 hover:bg-orange-800 rounded-lg transition-colors whitespace-nowrap"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>Send Directly via Email Client ({BUSINESS_INFO.email})</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyConfirmation}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                          <span>Request Summary Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          <span>Copy Request Summary</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmittedRecord(null)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Back to Form</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 17: CONTACT SECTION */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200">
            <div>
              <p className="text-xs font-medium text-orange-700">
                Contact Information · Greater Houston Service
              </p>
              <h2
                id="contact-heading"
                className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
              >
                Get in Touch with {BUSINESS_INFO.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setLegalModalType('standards')}
              className="text-xs font-medium text-slate-600 hover:text-orange-700 underline underline-offset-4 self-start lg:self-auto cursor-pointer"
            >
              Our Service Standards &amp; Commitment
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Card */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Phone Dispatch</span>
                  <Phone className="w-4 h-4 text-orange-700" aria-hidden="true" />
                </div>
                <p className="mt-3 font-mono text-base font-semibold text-slate-900">
                  {BUSINESS_INFO.phoneDisplay}
                </p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {BUSINESS_INFO.phoneVerificationNote}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={onOpenPhoneModal}
                  className="text-xs font-semibold text-orange-700 hover:text-orange-800 inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Call Dispatch Line</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Direct Email</span>
                  <Mail className="w-4 h-4 text-orange-700" aria-hidden="true" />
                </div>
                <p className="mt-3 font-mono text-sm font-semibold text-slate-900 break-all">
                  {BUSINESS_INFO.email}
                </p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Email us anytime with your property details, questions, or requests for a free estimate.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200/80">
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-xs font-semibold text-orange-700 hover:text-orange-800 inline-flex items-center gap-1.5"
                >
                  <span>Send Email Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Business Hours</span>
                  <Clock className="w-4 h-4 text-orange-700" aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  Monday – Friday
                </p>
                <p className="mt-1 font-mono text-xs text-orange-800">
                  7:00 AM – 6:00 PM
                </p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Available during normal weekday business hours. Online estimate requests are accepted 24/7.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200/80 text-xs text-slate-500">
                Saturday: 8:00 AM – 2:00 PM (By Appointment)
              </div>
            </div>

            {/* Service Area & Address Card */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Location &amp; Service Area</span>
                  <MapPin className="w-4 h-4 text-orange-700" aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {BUSINESS_INFO.addressDisplay}
                </p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Serving Greater Houston, Cypress, Champions, Tomball, Stafford, Richmond, Rosenberg, and Southeast Texas.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200/80 text-xs font-mono text-slate-500">
                {BUSINESS_INFO.mapsDisplay}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 18: FOOTER (with extra bottom padding on mobile so sticky action bar never overlaps) */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-28 lg:pb-16 border-t border-slate-900">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
            {/* Brand & Summary */}
            <div className="lg:col-span-4 space-y-4">
              <p className="font-editorial text-xl font-semibold text-white tracking-tight">
                {BUSINESS_INFO.name}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Residential, commercial, and industrial thermal insulation services in Houston and Southeast Texas. Dedicated to helping property owners improve indoor comfort and reduce unwanted heat transfer.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#estimate"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSection('estimate');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-lg transition-all whitespace-nowrap"
                >
                  <span>Get a Free Estimate</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => onScrollToSection('top')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>

            {/* Verified Services */}
            <div className="lg:col-span-3 space-y-3">
              <p className="text-xs font-semibold text-white tracking-wide">
                Insulation Services
              </p>
              <ul className="space-y-2 text-xs sm:text-sm">
                {VERIFIED_SERVICES.map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      onClick={() => onSelectServiceForEstimate(service.shortTitle, undefined, 'contact')}
                      className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {service.shortTitle}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Areas */}
            <div className="lg:col-span-2 space-y-3">
              <p className="text-xs font-semibold text-white tracking-wide">
                Service Areas
              </p>
              <ul className="space-y-2 text-xs sm:text-sm">
                {SERVICE_AREAS.map((area) => (
                  <li key={area.id}>
                    <button
                      type="button"
                      onClick={() =>
                        onSelectAreaForEstimate(
                          area.name,
                          area.zipExamples.split(',')[0].trim(),
                          'contact'
                        )
                      }
                      className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {area.name.split(' (')[0]}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact Details */}
            <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
              <p className="text-xs font-semibold text-white tracking-wide">
                Contact &amp; Dispatch
              </p>
              <p className="text-slate-300 font-mono">{BUSINESS_INFO.phoneDisplay}</p>
              <p>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-slate-300 hover:text-white underline underline-offset-4 font-mono break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
              </p>
              <p className="text-slate-400">{BUSINESS_INFO.addressDisplay}</p>
              <p className="text-slate-400">Mon – Fri (Normal Business Hours)</p>
            </div>
          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved. Serving Houston &amp; Southeast Texas.
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => setLegalModalType('privacy')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
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
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs"
        >
          <div className="bg-white border border-slate-200 rounded-xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 id="legal-modal-title" className="text-xl font-semibold text-slate-900">
                {legalModalType === 'privacy' && 'Privacy Policy'}
                {legalModalType === 'terms' && 'Terms of Service'}
                {legalModalType === 'standards' && 'Our Service Standards & Quality Commitment'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalModalType(null)}
                aria-label="Close dialog"
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm text-slate-600 leading-relaxed">
              {legalModalType === 'privacy' && (
                <>
                  <p>
                    <strong className="text-slate-900">{BUSINESS_INFO.name}</strong> respects your privacy. Information submitted through our Free Estimate request form—including your name, phone number, email address, ZIP code, and project notes—is collected solely for the purpose of responding to your inquiry and providing residential or commercial insulation consultations.
                  </p>
                  <p>
                    We do not sell or rent your personal contact information to third-party lead brokers. To request updates or removal of your inquiry information, contact us at{' '}
                    <span className="font-mono text-slate-900">{BUSINESS_INFO.email}</span>.
                  </p>
                </>
              )}

              {legalModalType === 'terms' && (
                <>
                  <p>
                    All educational content and conceptual building-science descriptions on this website are provided for general informational purposes. Actual thermal performance and project scope depend on on-site inspection of your specific residential, commercial, or industrial structure.
                  </p>
                  <p>
                    Project estimates, material specifications, timelines, and terms are confirmed in writing prior to the start of any installation or insulation removal work by <strong className="text-slate-900">{BUSINESS_INFO.name}</strong>.
                  </p>
                </>
              )}

              {legalModalType === 'standards' && (
                <>
                  <p className="text-slate-800 font-medium">
                    At <strong className="text-slate-900">{BUSINESS_INFO.name}</strong>, our work is guided by strict building-science principles and local Houston climate expertise:
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 shrink-0" />
                      <span><strong>On-Site Property Assessment:</strong> We inspect existing attic depths, roof rafters, wall cavities, and subfloors before recommending materials.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 shrink-0" />
                      <span><strong>Air-Sealing Priority:</strong> We target ceiling penetrations and draft points before adding insulation for optimal thermal barrier performance.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 shrink-0" />
                      <span><strong>Clean &amp; Respectful Execution:</strong> Complete containment during old insulation extraction and spotless cleanup upon completion.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 shrink-0" />
                      <span><strong>Transparent Written Estimates:</strong> No hidden fees, clear scope of work, and friendly service throughout Greater Houston.</span>
                    </li>
                  </ul>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setLegalModalType(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Back to Page</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setLegalModalType(null);
                  onScrollToSection('estimate');
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-orange-700 hover:bg-orange-800 rounded-lg cursor-pointer"
              >
                Get a Free Estimate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
