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
} from 'lucide-react';
import {
  BUSINESS_INFO,
  SERVICES_DATA,
  SITE_SECTIONS,
} from '../data/siteContent';

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
    propertyType: 'Residential',
    serviceNeeded: 'Spray Foam Insulation',
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
      nextErrors.phone = 'Please enter a valid 10-digit US phone number.';
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

    const refNum = `HSF-${Math.floor(100000 + Math.random() * 900000)}`;
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
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <button
              type="button"
              onClick={onGoBackSection}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
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
            {/* Left Column: Supporting Info & Phone Card */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                  Complimentary Consultation · Houston, Texas
                </p>
                <h2
                  id="estimate-heading"
                  className="mt-2.5 text-2xl sm:text-4xl font-semibold text-white tracking-tight"
                >
                  Ready to Improve Your Property’s Insulation?
                </h2>
                <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Tell us about your residential or commercial project. We will review your insulation and air-sealing requirements and provide a complimentary, no-obligation estimate.
                </p>
              </div>

              {/* Direct Phone Card */}
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-800/90 border border-slate-700/90 space-y-5 shadow-xl backdrop-blur-xs">
                <div>
                  <p className="text-xs text-orange-400 font-semibold uppercase tracking-wide">
                    Prefer to Speak Directly?
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-white">
                    Talk With {BUSINESS_INFO.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    Call our team directly to discuss spray foam, attic retrofits, commercial buildings, or new construction insulation needs.
                  </p>
                </div>

                <div className="pt-1">
                  <a
                    href={BUSINESS_INFO.phoneTel}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-4 text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-md transition-all whitespace-nowrap active:scale-95"
                  >
                    <Phone className="w-4 h-4 text-orange-700 shrink-0" aria-hidden="true" />
                    <span className="font-mono font-bold">Call {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-slate-700/80 flex flex-col gap-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-400">Direct Email:</span>
                    <a
                      href={`mailto:${BUSINESS_INFO.email}`}
                      className="font-mono text-white hover:text-orange-400 underline underline-offset-4 truncate"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-slate-400">Location:</span>
                    <span>{BUSINESS_INFO.locationDisplay}</span>
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="space-y-3 text-sm text-slate-300 border-t border-slate-800 pt-6">
                <p className="font-semibold text-white">What happens next:</p>
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="font-mono font-semibold text-orange-400">01.</span>
                    <span>We review your property type and insulation scope.</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="font-mono font-semibold text-orange-400">02.</span>
                    <span>We follow up promptly by phone or email to schedule an on-site review.</span>
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start gap-2">
                    <span className="font-mono font-semibold text-orange-400">03.</span>
                    <span>You receive a clear, straightforward estimate with zero high-pressure tactics.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Free Estimate Form */}
            <div className="lg:col-span-7 bg-white text-slate-900 rounded-2xl border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-2xl">
              {!submittedRecord ? (
                <form onSubmit={handleSubmit} noValidate aria-label="Request a Free Estimate">
                  <div className="pb-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
                        Request a Free Estimate
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-slate-600">
                        Complete the short form below. Fields marked with * are required.
                      </p>
                    </div>
                    <span className="text-xs text-orange-800 bg-orange-50 border border-orange-200/80 px-2.5 py-1 rounded-md font-mono self-start sm:self-auto font-semibold">
                      100% Free
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="estimate-full-name"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Name *
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
                        placeholder="e.g., John Smith"
                        aria-invalid={Boolean(errors.fullName)}
                        aria-describedby={errors.fullName ? 'error-full-name' : undefined}
                        className={`w-full px-3.5 py-3 text-sm rounded-xl border bg-slate-50/70 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-2 focus:outline-orange-700 transition-colors ${
                          errors.fullName ? 'border-red-600 ring-1 ring-red-500' : 'border-slate-300'
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
                        Phone *
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
                        placeholder="e.g., (713) 555-0199"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={errors.phone ? 'error-phone' : undefined}
                        className={`w-full px-3.5 py-3 text-sm rounded-xl border bg-slate-50/70 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-2 focus:outline-orange-700 transition-colors ${
                          errors.phone ? 'border-red-600 ring-1 ring-red-500' : 'border-slate-300'
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
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="estimate-email"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Email *
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
                        className={`w-full px-3.5 py-3 text-sm rounded-xl border bg-slate-50/70 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-2 focus:outline-orange-700 transition-colors ${
                          errors.email ? 'border-red-600 ring-1 ring-red-500' : 'border-slate-300'
                        }`}
                      />
                      {errors.email && (
                        <p id="error-email" className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Property Type Dropdown */}
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
                        className="w-full px-3.5 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50/70 text-slate-900 focus:bg-white focus:outline-2 focus:outline-orange-700 transition-colors cursor-pointer"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Commercial">Commercial</option>
                        <option value="New Construction">New Construction</option>
                        <option value="Renovation">Renovation</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Service Needed Dropdown */}
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
                        className="w-full px-3.5 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50/70 text-slate-900 focus:bg-white focus:outline-2 focus:outline-orange-700 transition-colors cursor-pointer"
                      >
                        <option value="Spray Foam Insulation">Spray Foam Insulation</option>
                        <option value="Attic Insulation">Attic Insulation</option>
                        <option value="Residential Insulation">Residential Insulation</option>
                        <option value="Commercial Insulation">Commercial Insulation</option>
                        <option value="Not Sure">Not Sure</option>
                      </select>
                    </div>

                    {/* Message / Project Details */}
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="estimate-message"
                        className="block text-xs font-semibold text-slate-800 mb-1.5"
                      >
                        Message (Optional)
                      </label>
                      <textarea
                        id="estimate-message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your property, specific areas of concern, or estimated project timeline..."
                        className="w-full px-3.5 py-3 text-sm rounded-xl border border-slate-300 bg-slate-50/70 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-2 focus:outline-orange-700 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="mt-7 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500">
                      Your information is kept strictly private.
                    </p>
                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-xl shadow-md cta-glow transition-all cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      <span>Request a Free Estimate</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-4 space-y-6" role="status" aria-live="polite">
                  <div className="flex items-start gap-3.5 pb-5 border-b border-slate-200">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-mono text-slate-500">
                        ESTIMATE INQUIRY LOGGED · REF {submittedRecord.referenceId}
                      </p>
                      <h3 className="mt-1 text-2xl font-semibold text-slate-900">
                        Thank You, {submittedRecord.fullName}
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                        Your inquiry for <strong className="text-slate-900">{submittedRecord.serviceNeeded}</strong> has been generated.
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
                      <span className="text-slate-500">Contact:</span>
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
                        `Estimate Request (${submittedRecord.referenceId}) - ${submittedRecord.serviceNeeded}`
                      )}&body=${encodeURIComponent(
                        `Hello Houston Spray Foam Insulation,\n\nI would like to request an estimate:\n\nName: ${submittedRecord.fullName}\nPhone: ${submittedRecord.phone}\nEmail: ${submittedRecord.email}\nProperty Type: ${submittedRecord.propertyType}\nService Needed: ${submittedRecord.serviceNeeded}\nMessage: ${submittedRecord.message || 'N/A'}\n`
                      )}`}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-white bg-orange-700 hover:bg-orange-800 rounded-xl transition-colors whitespace-nowrap cta-glow active:scale-95"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>Send Email ({BUSINESS_INFO.email})</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyConfirmation}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap cursor-pointer active:scale-95"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                          <span>Summary Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          <span>Copy Summary</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSubmittedRecord(null)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
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

      {/* SECTION 10: CONTACT SECTION */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200">
            <div>
              <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
                Direct Contact · Houston, Texas
              </p>
              <h2
                id="contact-heading"
                className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
              >
                Contact {BUSINESS_INFO.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setLegalModalType('standards')}
              className="text-xs font-medium text-slate-600 hover:text-orange-700 underline underline-offset-4 self-start lg:self-auto cursor-pointer"
            >
              Our Service Standards &amp; Approach
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Card */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between card-hover hover:border-slate-300 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">Direct Phone</span>
                  <Phone className="w-4 h-4 text-orange-700" aria-hidden="true" />
                </div>
                <p className="mt-3 font-mono text-base font-bold text-slate-900">
                  {BUSINESS_INFO.phoneDisplay}
                </p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {BUSINESS_INFO.phoneNote}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200/80">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="text-xs font-semibold text-orange-700 hover:text-orange-800 inline-flex items-center gap-1.5"
                >
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between card-hover hover:border-slate-300 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">Email</span>
                  <Mail className="w-4 h-4 text-orange-700" aria-hidden="true" />
                </div>
                <p className="mt-3 font-mono text-xs sm:text-sm font-semibold text-slate-900 break-all">
                  {BUSINESS_INFO.email}
                </p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Send your project details, questions, or estimate inquiries anytime.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200/80">
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-xs font-semibold text-orange-700 hover:text-orange-800 inline-flex items-center gap-1.5"
                >
                  <span>Send Email</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between card-hover hover:border-slate-300 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">Business Hours</span>
                  <Clock className="w-4 h-4 text-orange-700" aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  Monday – Friday
                </p>
                <p className="mt-1 font-mono text-xs text-orange-800 font-semibold">
                  7:00 AM – 6:00 PM
                </p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Available for weekday phone consultations. Online inquiries accepted 24/7.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200/80 text-xs text-slate-500">
                Saturday: By Appointment
              </div>
            </div>

            {/* Location Card */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col justify-between card-hover hover:border-slate-300 hover:shadow-md transition-all">
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="font-medium">Location</span>
                  <MapPin className="w-4 h-4 text-orange-700" aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm font-semibold text-slate-900">
                  {BUSINESS_INFO.locationDisplay}
                </p>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  Serving residential and commercial properties throughout Houston, TX.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200/80 text-xs font-mono text-slate-500">
                Houston, Texas &amp; Greater Metro
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 13: FOOTER */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-28 lg:pb-16 border-t border-slate-900">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
            {/* Brand & Summary */}
            <div className="lg:col-span-5 space-y-4">
              <p className="font-editorial text-xl font-semibold text-white tracking-tight">
                {BUSINESS_INFO.name}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                Professional spray foam and thermal insulation solutions for residential and commercial properties in Houston, TX. Helping property owners improve indoor comfort and air sealing.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="#estimate"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSection('estimate');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-xl transition-all whitespace-nowrap cta-glow active:scale-95"
                >
                  <span>Request a Free Estimate</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => onScrollToSection('top')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors cursor-pointer active:scale-95"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
                  <span>Back to Top</span>
                </button>
              </div>
            </div>

            {/* Services Links */}
            <div className="lg:col-span-3 space-y-3">
              <p className="text-xs font-semibold text-white uppercase tracking-wider">
                Services
              </p>
              <ul className="space-y-2 text-xs sm:text-sm">
                {SERVICES_DATA.map((service) => (
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

            {/* Navigation Links */}
            <div className="lg:col-span-2 space-y-3">
              <p className="text-xs font-semibold text-white uppercase tracking-wider">
                Navigation
              </p>
              <ul className="space-y-2 text-xs sm:text-sm">
                {[
                  { id: 'top', label: 'Home' },
                  { id: 'services', label: 'Services' },
                  { id: 'why-spray-foam', label: 'Why Spray Foam' },
                  { id: 'houston-solutions', label: 'Houston Solutions' },
                  { id: 'process', label: 'Our Process' },
                  { id: 'faq', label: 'FAQ' },
                  { id: 'contact', label: 'Contact' },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onScrollToSection(item.id)}
                      className="text-left text-slate-400 hover:text-white transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div className="lg:col-span-2 space-y-3 text-xs sm:text-sm">
              <p className="text-xs font-semibold text-white uppercase tracking-wider">
                Contact
              </p>
              <p>
                <a href={BUSINESS_INFO.phoneTel} className="text-slate-300 hover:text-white font-mono font-semibold">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="text-slate-300 hover:text-white underline underline-offset-4 font-mono break-all"
                >
                  {BUSINESS_INFO.email}
                </a>
              </p>
              <p className="text-slate-400">{BUSINESS_INFO.locationDisplay}</p>
              <p className="text-slate-400">{BUSINESS_INFO.hoursDisplay}</p>
            </div>
          </div>

          {/* Bottom Legal Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved. Houston, TX.
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
                onClick={() => setLegalModalType('terms')}
                className="hover:text-slate-300 transition-colors cursor-pointer"
              >
                Terms of Service
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
          <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <h3 id="legal-modal-title" className="text-xl font-semibold text-slate-900">
                {legalModalType === 'privacy' && 'Privacy Policy'}
                {legalModalType === 'terms' && 'Terms of Service'}
                {legalModalType === 'standards' && 'Our Service Standards & Commitment'}
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
                    <strong className="text-slate-900">{BUSINESS_INFO.name}</strong> respects your privacy. Information submitted through our estimate request form—including your name, phone number, email address, property type, and project notes—is collected solely for the purpose of responding to your inquiry and discussing insulation solutions for your property.
                  </p>
                  <p>
                    We do not sell or rent your personal contact information to third-party lead brokers. If you have questions regarding your inquiry details, contact us at{' '}
                    <span className="font-mono text-slate-900">{BUSINESS_INFO.email}</span>.
                  </p>
                </>
              )}

              {legalModalType === 'terms' && (
                <>
                  <p>
                    All building-science descriptions, educational summaries, and climate considerations on this website are provided for general informational purposes. Actual thermal performance and installation scope depend on an on-site evaluation of your specific residential or commercial structure in Houston, TX.
                  </p>
                  <p>
                    Project estimates, material recommendations, timelines, and terms are confirmed prior to scheduling insulation work with <strong className="text-slate-900">{BUSINESS_INFO.name}</strong>.
                  </p>
                </>
              )}

              {legalModalType === 'standards' && (
                <>
                  <p className="text-slate-800 font-medium">
                    At <strong className="text-slate-900">{BUSINESS_INFO.name}</strong>, we are committed to professional service standards:
                  </p>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 shrink-0" />
                      <span><strong>On-Site Property Review:</strong> We discuss your building layout, attic accessibility, or commercial structure before recommending an application.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 shrink-0" />
                      <span><strong>Air-Sealing &amp; Thermal Focus:</strong> We prioritize continuous air barriers to restrict uncontrolled outdoor air and humidity infiltration.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-2 shrink-0" />
                      <span><strong>Transparent Written Estimates:</strong> Clear scope of work, straightforward communication, and no high-pressure sales tactics.</span>
                    </li>
                  </ul>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setLegalModalType(null)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
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
                className="px-4 py-2 text-xs font-semibold text-white bg-orange-700 hover:bg-orange-800 rounded-xl cursor-pointer shadow-xs active:scale-95"
              >
                Request a Free Estimate
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
