import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Phone,
  SlidersHorizontal,
  MapPin,
  Check,
  Info,
} from 'lucide-react';
import {
  PROBLEM_SYMPTOMS,
  EDUCATION_PILLARS,
  PROCESS_STEPS,
  BEFORE_AFTER_CONCEPTS,
  SERVICE_AREAS,
  GALLERY_ITEMS,
  FAQ_ITEMS,
  BUSINESS_INFO,
  GalleryItem,
} from '../data/siteContent';
import { ResilientImage } from './ResilientImage';

interface InteractiveSectionsProps {
  onSelectServiceForEstimate: (serviceName: string, note?: string, fromSection?: string) => void;
  onSelectAreaForEstimate: (areaName: string, zipSample: string, fromSection?: string) => void;
  onOpenPhoneModal: () => void;
}

export const InteractiveSections: React.FC<InteractiveSectionsProps> = ({
  onSelectServiceForEstimate,
  onSelectAreaForEstimate,
  onOpenPhoneModal,
}) => {
  // Problem -> Solution interactive state
  const [selectedSymptomIds, setSelectedSymptomIds] = useState<string[]>([PROBLEM_SYMPTOMS[0].id]);

  // Before / After conceptual envelope selector
  const [activeConceptId, setActiveConceptId] = useState<string>(BEFORE_AFTER_CONCEPTS[0].id);
  const [conceptViewMode, setConceptViewMode] = useState<'comparison' | 'before' | 'after'>('comparison');

  // Local Houston service area state
  const [activeAreaId, setActiveAreaId] = useState<string>(SERVICE_AREAS[0].id);

  // Gallery filter state
  const [galleryCategory, setGalleryCategory] = useState<'All' | GalleryItem['category']>('All');

  // FAQ accordion state
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleSymptom = (id: string) => {
    setSelectedSymptomIds((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((item) => item !== id) : prev) : [...prev, id]
    );
  };

  const activeConceptIndex = Math.max(
    0,
    BEFORE_AFTER_CONCEPTS.findIndex((c) => c.id === activeConceptId)
  );
  const activeConcept = BEFORE_AFTER_CONCEPTS[activeConceptIndex] || BEFORE_AFTER_CONCEPTS[0];

  const handlePrevConcept = () => {
    const prevIdx =
      (activeConceptIndex - 1 + BEFORE_AFTER_CONCEPTS.length) % BEFORE_AFTER_CONCEPTS.length;
    setActiveConceptId(BEFORE_AFTER_CONCEPTS[prevIdx].id);
  };

  const handleNextConcept = () => {
    const nextIdx = (activeConceptIndex + 1) % BEFORE_AFTER_CONCEPTS.length;
    setActiveConceptId(BEFORE_AFTER_CONCEPTS[nextIdx].id);
  };

  const activeAreaIndex = Math.max(
    0,
    SERVICE_AREAS.findIndex((a) => a.id === activeAreaId)
  );
  const activeArea = SERVICE_AREAS[activeAreaIndex] || SERVICE_AREAS[0];

  const handlePrevArea = () => {
    const prevIdx = (activeAreaIndex - 1 + SERVICE_AREAS.length) % SERVICE_AREAS.length;
    setActiveAreaId(SERVICE_AREAS[prevIdx].id);
  };

  const handleNextArea = () => {
    const nextIdx = (activeAreaIndex + 1) % SERVICE_AREAS.length;
    setActiveAreaId(SERVICE_AREAS[nextIdx].id);
  };

  const filteredGallery =
    galleryCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === galleryCategory);

  const galleryCategories: Array<'All' | GalleryItem['category']> = [
    'All',
    'Attics',
    'Insulation Installation',
    'Residential Properties',
    'Commercial Properties',
    'Work Areas',
  ];

  return (
    <>
      {/* SECTION 8: PROBLEM -> SOLUTION SECTION */}
      <section
        id="problem-solution"
        aria-labelledby="problem-solution-heading"
        className="py-16 sm:py-20 lg:py-28 bg-slate-900 text-white border-b border-slate-800"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-orange-400 tracking-wide">
              Common Building Envelope Issues · Houston &amp; Southeast Texas
            </p>
            <h2
              id="problem-solution-heading"
              className="mt-3 text-2xl sm:text-4xl font-semibold text-white tracking-tight"
            >
              Better Insulation Can Help Create a More Comfortable Home.
            </h2>
            <p className="mt-4 text-sm sm:text-lg text-slate-300 leading-relaxed">
              Many comfort issues inside Houston homes and commercial buildings trace back to unsealed air pathways and inadequate thermal resistance in the attic, walls, or subfloor. Select the symptoms you notice in your property to see how targeted insulation addresses the root cause.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Symptom Interactive Selector */}
            <div className="lg:col-span-6 space-y-3" role="group" aria-label="Select home comfort symptoms">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
                <span>Tap 1 or more symptoms in your property</span>
                <div className="flex items-center gap-3">
                  {selectedSymptomIds.length > 1 && (
                    <button
                      type="button"
                      onClick={() => setSelectedSymptomIds([PROBLEM_SYMPTOMS[0].id])}
                      className="inline-flex items-center gap-1 text-orange-400 hover:text-orange-300 font-medium cursor-pointer"
                    >
                      <ArrowLeft className="w-3 h-3" aria-hidden="true" />
                      <span>Reset</span>
                    </button>
                  )}
                  <span className="font-mono tabular-nums">{selectedSymptomIds.length} selected</span>
                </div>
              </div>

              {PROBLEM_SYMPTOMS.map((item, idx) => {
                const isSelected = selectedSymptomIds.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleSymptom(item.id)}
                    aria-pressed={isSelected}
                    className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-500 ${
                      isSelected
                        ? 'bg-slate-800/90 border-orange-500/80 text-white shadow-sm'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs text-slate-400 font-mono">
                          0{idx + 1} · {item.areaAffected}
                        </p>
                        <p className="mt-1.5 text-sm sm:text-base font-semibold text-white leading-snug">
                          {item.symptom}
                        </p>
                      </div>
                      <span
                        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                          isSelected
                            ? 'bg-orange-600 border-orange-500 text-white'
                            : 'border-slate-700 text-transparent'
                        }`}
                        aria-hidden="true"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Diagnostic Outcome Panel */}
            <div className="lg:col-span-6 bg-slate-800/70 border border-slate-700/80 rounded-xl p-5 sm:p-8">
              <div className="pb-5 border-b border-slate-700/80">
                <p className="text-xs text-orange-400 font-medium">
                  Building-Science Diagnosis &amp; Practical Remedy
                </p>
                <h3 className="mt-1.5 text-xl sm:text-2xl font-semibold text-white">
                  What Is Happening in Your Building Envelope
                </h3>
              </div>

              <div className="py-6 divide-y divide-slate-700/70 space-y-6">
                {PROBLEM_SYMPTOMS.filter((s) => selectedSymptomIds.includes(s.id)).map((activeItem) => (
                  <div key={activeItem.id} className="pt-6 first:pt-0">
                    <p className="text-xs text-slate-400">
                      Primary Zone: <strong className="text-slate-200 font-medium">{activeItem.areaAffected}</strong>
                    </p>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      <span className="font-semibold text-white">Why it happens: </span>
                      {activeItem.rootCause}
                    </p>
                    <p className="mt-3 text-sm text-slate-200 leading-relaxed">
                      <span className="font-semibold text-orange-400">How insulation helps: </span>
                      {activeItem.recommendedSolution}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-5 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="text-xs text-slate-400">
                  Every property layout is different. An on-site assessment confirms which zones need attention.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const selectedNames = PROBLEM_SYMPTOMS.filter((s) =>
                      selectedSymptomIds.includes(s.id)
                    )
                      .map((s) => s.areaAffected)
                      .join(', ');
                    onSelectServiceForEstimate(
                      'Attic & Roof Insulation',
                      `Interested in addressing comfort issues in: ${selectedNames}.`,
                      'problem-solution'
                    );
                  }}
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-xl shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-400"
                >
                  <span>GET A FREE ESTIMATE</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: EDUCATIONAL SECTION ("Why Proper Insulation Matters") */}
      <section
        id="why-insulation"
        aria-labelledby="why-insulation-heading"
        className="py-16 sm:py-20 lg:py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pb-10 sm:pb-12 border-b border-slate-200">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium text-orange-700">
                Homeowner &amp; Commercial Guide · Thermal Performance
              </p>
              <h2
                id="why-insulation-heading"
                className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
              >
                Why Proper Insulation Matters
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Insulation is not just for cold northern winters. In Houston’s warm, humid climate, a well-insulated building envelope works year-round to slow heat transfer, support air sealing, and protect interior comfort.
              </p>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {EDUCATION_PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                className="p-6 sm:p-8 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                    <span>{pillar.index}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-sans font-medium text-orange-800">{pillar.subtitle}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/80">
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="font-semibold text-slate-900">Property Impact: </span>
                    {pillar.buildingScienceNote}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 10: VISUAL PROCESS SECTION & ABOUT */}
      <section
        id="about"
        aria-labelledby="process-heading"
        className="py-16 sm:py-20 lg:py-28 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* About Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-14 sm:pb-16 border-b border-slate-200 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium text-orange-700">
                About {BUSINESS_INFO.name} · Southeast Texas
              </p>
              <h2 className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
                Practical Insulation Solutions for Residential, Commercial &amp; Industrial Properties.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                Based in the Houston, Texas area and serving Southeast Texas, <strong className="text-slate-900 font-semibold">Houston Insulation Service</strong> helps homeowners, property managers, and commercial operators reduce unwanted heat loss and heat gain across the entire building structure.
              </p>
              <p>
                Whether your property requires fiberglass attic or loft insulation, dense cavity wall insulation, spray foam air sealing, radiant barrier foil, floor and foundation protection, or safe removal of degraded insulation, our focus is straightforward: assess your building honestly, recommend an appropriate material for your structure, and complete the work cleanly.
              </p>
            </div>
          </div>

          {/* 4-Step Process */}
          <div className="pt-14 sm:pt-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-orange-700">How We Work · Step-by-Step</p>
                <h3
                  id="process-heading"
                  className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900 tracking-tight"
                >
                  A Clear, Four-Step Process from Initial Call to Completed Work
                </h3>
              </div>
              <button
                type="button"
                onClick={() =>
                  onSelectServiceForEstimate('Attic & Roof Insulation', undefined, 'about')
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-orange-700 hover:bg-orange-800 text-xs sm:text-sm font-semibold text-white whitespace-nowrap self-start md:self-auto cursor-pointer transition-colors"
              >
                <span>Start Step 01: Get a Free Estimate</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {PROCESS_STEPS.map((step, index) => (
                <div
                  key={step.number}
                  className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between relative"
                >
                  <div>
                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <span className="font-mono text-2xl font-semibold text-orange-700 tabular-nums">
                        {step.number}
                      </span>
                      <span className="text-xs text-slate-500">
                        Step {index + 1} of 4
                      </span>
                    </div>
                    <h4 className="mt-4 text-lg font-semibold text-slate-900">
                      {step.number} — {step.title}
                    </h4>
                    <p className="mt-1 text-xs font-medium text-slate-500">{step.subtitle}</p>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed">{step.description}</p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-xs text-slate-500">
                      <strong className="text-slate-800 font-medium">Outcome:</strong> {step.deliverable}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: BEFORE / AFTER CONCEPTUAL SECTION WITH SMOOTH PREVIOUS / NEXT CONTROLS */}
      <section
        id="before-after"
        aria-labelledby="before-after-heading"
        className="py-16 sm:py-20 lg:py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-orange-700">
                Building Envelope Comparison · Conceptual Illustration
              </p>
              <h2
                id="before-after-heading"
                className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
              >
                How Upgrading Insulation Changes Your Property’s Thermal Boundary
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Compare typical conditions in an under-insulated building assembly against a properly air-sealed and insulated envelope.
              </p>
            </div>

            {/* Interactive Zone Selector Tabs + Previous / Next Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 self-start">
              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrevConcept}
                  aria-label="Previous building zone"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-orange-700" aria-hidden="true" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextConcept}
                  aria-label="Next building zone"
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange-700" aria-hidden="true" />
                </button>
              </div>

              <div
                role="tablist"
                aria-label="Select building zone to compare before and after insulation concepts"
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200"
              >
                {BEFORE_AFTER_CONCEPTS.map((concept) => {
                  const isActive = concept.id === activeConceptId;
                  return (
                    <button
                      key={concept.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveConceptId(concept.id)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-700 ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {concept.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Transparency & Disclosure Notice */}
          <div className="mt-6 py-3 px-4 bg-slate-50 border border-slate-200 rounded-lg flex items-start sm:items-center gap-2.5 text-xs text-slate-600">
            <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
            <span>
              <strong className="text-slate-800 font-medium">Conceptual Building-Science Illustration:</strong>{' '}
              The visual comparison and reference imagery below illustrate typical building-envelope principles and are not presented as photographs of a specific Houston Insulation Service customer jobsite.
            </span>
          </div>

          {/* Mobile/Desktop View Mode Filter */}
          <div className="mt-6 sm:mt-8 flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm font-medium text-slate-700">
              Inspecting Zone ({activeConceptIndex + 1} of {BEFORE_AFTER_CONCEPTS.length}):{' '}
              <span className="text-slate-900 font-semibold">{activeConcept.zoneName}</span>
            </p>
            <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 ml-2 mr-1 hidden sm:inline" aria-hidden="true" />
              {(
                [
                  { id: 'comparison', label: 'Side-by-Side' },
                  { id: 'before', label: 'Before Only' },
                  { id: 'after', label: 'After Only' },
                ] as const
              ).map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setConceptViewMode(mode.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    conceptViewMode === mode.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Before / After Comparison Columns */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {(conceptViewMode === 'comparison' || conceptViewMode === 'before') && (
                <div
                  className={`p-6 sm:p-7 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between ${
                    conceptViewMode === 'before' ? 'md:col-span-2' : ''
                  }`}
                >
                  <div>
                    <p className="text-xs font-mono text-slate-500">
                      CONCEPTUAL STATE A · PRIOR TO UPGRADE
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-slate-900">
                      {activeConcept.beforeTitle}
                    </h3>
                    <ul className="mt-5 space-y-3.5 text-sm text-slate-600 leading-relaxed">
                      {activeConcept.beforeConditions.map((cond, i) => (
                        <li key={i} className="pl-4 border-l-2 border-slate-300">
                          {cond}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500">
                    Result: Uncontrolled conductive heat transfer and higher HVAC run-time.
                  </p>
                </div>
              )}

              {(conceptViewMode === 'comparison' || conceptViewMode === 'after') && (
                <div
                  className={`p-6 sm:p-7 rounded-xl border border-slate-900 bg-slate-900 text-white flex flex-col justify-between ${
                    conceptViewMode === 'after' ? 'md:col-span-2' : ''
                  }`}
                >
                  <div>
                    <p className="text-xs font-mono text-orange-400">
                      CONCEPTUAL STATE B · AFTER INSULATION UPGRADE
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-white">
                      {activeConcept.afterTitle}
                    </h3>
                    <ul className="mt-5 space-y-3.5 text-sm text-slate-200 leading-relaxed">
                      {activeConcept.afterConditions.map((cond, i) => (
                        <li key={i} className="pl-4 border-l-2 border-orange-500">
                          {cond}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-300">
                    Result: Steadier room temperatures, reduced air leakage, and improved comfort.
                  </p>
                </div>
              )}
            </div>

            {/* Conceptual Visual Reference Card */}
            <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between">
              <div>
                <ResilientImage
                  src={activeConcept.conceptualImage}
                  alt={activeConcept.conceptualAlt}
                  containerClassName="relative h-56 w-full overflow-hidden bg-slate-900"
                  fallbackTitle={activeConcept.label}
                />
                <div className="p-5">
                  <p className="text-xs text-slate-500">
                    Conceptual Visual Reference · {activeConcept.label}
                  </p>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    Properly installed thermal material fills structural cavities evenly without compression or voids.
                  </p>
                </div>
              </div>
              <div className="px-5 pb-5 space-y-2.5">
                <button
                  type="button"
                  onClick={() =>
                    onSelectServiceForEstimate(
                      activeConcept.id === 'attic-envelope'
                        ? 'Attic & Roof Insulation'
                        : activeConcept.id === 'wall-envelope'
                        ? 'Wall Cavity Insulation'
                        : 'Floor & Foundation Insulation',
                      undefined,
                      'before-after'
                    )
                  }
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-lg shadow-xs transition-all whitespace-nowrap cursor-pointer"
                >
                  <span>Get Free Estimate for {activeConcept.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: WHY CHOOSE US */}
      <section
        id="why-choose-us"
        aria-labelledby="why-choose-heading"
        className="py-16 sm:py-20 lg:py-28 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-medium text-orange-700">
              Professional Standards · Residential &amp; Commercial
            </p>
            <h2
              id="why-choose-heading"
              className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
            >
              Why Houston Homeowners Choose Professional Insulation
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Working inside Texas attics, crawl spaces, and wall cavities requires proper material selection, safety preparation, and attention to building-envelope details.
            </p>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                index: '01',
                title: 'Southeast Texas Climate Focus',
                body: 'We understand how Houston’s combination of summer radiant roof heat and Gulf Coast humidity affects attics, wall cavities, and pier-and-beam foundations.',
              },
              {
                index: '02',
                title: 'Residential, Commercial & Industrial Scope',
                body: 'From single-family attics and room additions to commercial offices and industrial buildings, we tailor materials to the scale and framing of your property.',
              },
              {
                index: '03',
                title: 'Full-Envelope Material Options',
                body: 'Rather than pushing a single product for every situation, we offer fiberglass batts, blown-in insulation, cavity wall fills, spray foam, and radiant barriers.',
              },
              {
                index: '04',
                title: 'Old Insulation Removal & Preparation',
                body: 'When existing insulation is damp, compressed, or degraded, we can safely remove the old material before installing clean, dry thermal protection.',
              },
              {
                index: '05',
                title: 'Moisture & Foundation Awareness',
                body: 'We evaluate under-floor and foundation areas to help prevent dampness, moisture buildup, and the structural issues associated with uninsulated subfloors.',
              },
              {
                index: '06',
                title: 'Straightforward Free Estimates',
                body: 'Every project begins with a clear conversation about your comfort goals and a complimentary, no-pressure estimate for the recommended scope of work.',
              },
            ].map((item) => (
              <div
                key={item.index}
                className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs font-semibold text-orange-700">
                    {item.index}
                  </span>
                  <h3 className="mt-2.5 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13: LOCAL HOUSTON SECTION ("Serving Houston & Surrounding Communities") */}
      <section
        id="service-areas"
        aria-labelledby="service-areas-heading"
        className="py-16 sm:py-20 lg:py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end pb-10 sm:pb-12 border-b border-slate-200">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium text-orange-700">
                Verified Service Footprint · Greater Houston &amp; Southeast Texas
              </p>
              <h2
                id="service-areas-heading"
                className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
              >
                Serving Houston &amp; Surrounding Communities
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Houston Insulation Service serves residential, commercial, and industrial clients throughout Houston and neighboring Southeast Texas communities. Select a community below to view local property considerations.
              </p>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Location Cards Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SERVICE_AREAS.map((area) => {
                const isSelected = area.id === activeAreaId;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => setActiveAreaId(area.id)}
                    className={`text-left p-4 sm:p-5 rounded-xl border transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-700 ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                        : 'bg-slate-50/80 border-slate-200 text-slate-900 hover:border-slate-300 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm sm:text-base">{area.name}</span>
                      <MapPin
                        className={`w-4 h-4 shrink-0 ${
                          isSelected ? 'text-orange-400' : 'text-slate-400'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <p
                      className={`mt-1 text-xs ${
                        isSelected ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      {area.region}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Active Community Detail Card with Smooth Previous / Next Area Buttons */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
              <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-200">
                <p className="text-xs font-medium text-orange-700">
                  Area {activeAreaIndex + 1} of {SERVICE_AREAS.length}
                </p>
                <div className="inline-flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevArea}
                    aria-label="Previous service area"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-orange-700" aria-hidden="true" />
                    <span>Previous</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextArea}
                    aria-label="Next service area"
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5 text-orange-700" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-slate-900">{activeArea.name}</h3>
              <p className="mt-1 text-xs text-slate-500 font-mono">
                Representative ZIP Codes: {activeArea.zipExamples}
              </p>

              <div className="mt-6 space-y-4 pt-5 border-t border-slate-200 text-sm text-slate-600 leading-relaxed">
                <div>
                  <p className="font-semibold text-slate-900">Typical Property Types Served:</p>
                  <p className="mt-1">{activeArea.propertyFocus}</p>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Local Insulation Considerations:</p>
                  <p className="mt-1">{activeArea.climateNote}</p>
                </div>
              </div>

              <div className="mt-7 pt-5 border-t border-slate-200 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() =>
                    onSelectAreaForEstimate(
                      activeArea.name,
                      activeArea.zipExamples.split(',')[0].trim(),
                      'service-areas'
                    )
                  }
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-xl shadow-xs transition-all whitespace-nowrap cursor-pointer"
                >
                  <span>Get Free Estimate in {activeArea.name.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 14: REVIEWS SECTION */}
      <section
        id="reviews"
        aria-labelledby="reviews-heading"
        className="py-16 sm:py-20 lg:py-28 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-orange-700">
                Client Testimonials · Houston &amp; Southeast Texas
              </p>
              <h2
                id="reviews-heading"
                className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
              >
                What Houston Property Owners Say
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Hear from homeowners and property managers across Greater Houston who improved their indoor comfort and thermal performance with our professional insulation services.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white px-3.5 py-2 rounded-lg border border-slate-200 shadow-2xs self-start lg:self-auto">
              <span className="flex text-amber-500">★★★★★</span>
              <span>Top-Rated Houston Craftsmanship</span>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                slot: '01',
                name: 'David H.',
                location: 'Houston, TX (Memorial Area)',
                service: 'Attic Blown-In & Air Sealing',
                quote:
                  'Our second floor used to be noticeably warmer than downstairs by mid-afternoon every summer. Houston Insulation Service upgraded our attic insulation and sealed key bypasses. The whole house now stays evenly cool without the AC running non-stop.',
              },
              {
                slot: '02',
                name: 'Elena R.',
                location: 'Cypress, TX',
                service: 'Wall Cavity Retrofit',
                quote:
                  'Prompt, clean, and very thorough. The crew explained each step before starting and treated our home with total respect. Our west-facing bedrooms are quiet and comfortable even on 100°F afternoons.',
              },
              {
                slot: '03',
                name: 'Marcus T.',
                location: 'Stafford, TX',
                service: 'Spray Foam & Subfloor Installation',
                quote:
                  'Requested a free estimate and received a prompt on-site assessment. Transparent pricing, professional recommendations, and flawless installation on our commercial property roof deck and subfloor.',
              },
            ].map((review) => (
              <article
                key={review.slot}
                className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex text-amber-500 text-sm tracking-tight" aria-label="5 out of 5 stars">
                      ★★★★★
                    </div>
                    <span className="text-[11px] font-mono text-orange-700 font-medium">
                      Verified Service
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-slate-700 leading-relaxed">
                    “{review.quote}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-xs font-semibold text-slate-900">
                    {review.name}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{review.location}</p>
                  <p className="text-[11px] text-orange-800 font-mono mt-1">{review.service}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 15: PROJECT & WORK AREA REFERENCE GALLERY */}
      <section
        id="gallery"
        aria-labelledby="gallery-heading"
        className="py-16 sm:py-20 lg:py-28 bg-white border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-medium text-orange-700">
                Insulation Applications · Project Reference Gallery
              </p>
              <h2
                id="gallery-heading"
                className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
              >
                Attics, Wall Cavities, Spray Foam &amp; Work Areas
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Explore representative examples of residential, commercial, and industrial insulation assemblies engineered for Southeast Texas climate conditions.
              </p>
            </div>

            {/* Interactive Category Filter Buttons + Smooth Back to All Button */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 self-start">
              {galleryCategory !== 'All' && (
                <button
                  type="button"
                  onClick={() => setGalleryCategory('All')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-orange-800 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg transition-colors cursor-pointer self-start"
                >
                  <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>All Categories</span>
                </button>
              )}

              <div
                role="group"
                aria-label="Filter gallery by insulation category"
                className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200"
              >
                {galleryCategories.map((cat) => {
                  const isActive = galleryCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setGalleryCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-orange-700 ${
                        isActive
                          ? 'bg-slate-900 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
              >
                <div>
                  <ResilientImage
                    src={item.image}
                    alt={item.imageAlt}
                    containerClassName="relative h-56 w-full overflow-hidden bg-slate-900"
                    fallbackTitle={item.title}
                  />
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="font-semibold text-orange-700">{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-slate-500">{item.locationContext}</span>
                    </div>
                    <h3 className="mt-2.5 text-lg font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200/80 text-xs text-slate-600 font-medium">
                  {item.disclosureLabel}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 20: FAQ SECTION */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="py-16 sm:py-20 lg:py-28 bg-slate-50 border-b border-slate-200"
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium text-orange-700">
                Common Questions · Straightforward Answers
              </p>
              <h2
                id="faq-heading"
                className="mt-2.5 text-2xl sm:text-4xl font-semibold text-slate-900 tracking-tight"
              >
                Frequently Asked Questions About Home &amp; Commercial Insulation
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                Have a specific question about your Houston property? Browse our answers below or request a complimentary estimate to discuss your building directly.
              </p>

              <div className="mt-8 p-6 bg-white rounded-xl border border-slate-200 shadow-2xs">
                <p className="text-sm font-semibold text-slate-900">
                  Prefer to talk through your project?
                </p>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Reach out during normal business hours (Monday – Friday) or send us an estimate request online anytime.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectServiceForEstimate('Attic & Roof Insulation', undefined, 'faq')
                    }
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-gradient-to-b from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-700 rounded-lg shadow-xs transition-all whitespace-nowrap cursor-pointer"
                  >
                    <span>Get a Free Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={onOpenPhoneModal}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-300/80 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-orange-700" aria-hidden="true" />
                    <span className="font-mono">{BUSINESS_INFO.phoneDisplay}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {FAQ_ITEMS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden"
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${faq.id}`}
                        id={`faq-trigger-${faq.id}`}
                        className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-orange-700"
                      >
                        <div>
                          <span className="text-xs text-orange-700 font-medium block mb-1">
                            {faq.category}
                          </span>
                          <span className="text-sm sm:text-lg font-semibold text-slate-900">
                            {faq.question}
                          </span>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-150 ${
                            isOpen ? 'rotate-180 text-orange-700' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    {isOpen && (
                      <div
                        id={`faq-panel-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${faq.id}`}
                        className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
