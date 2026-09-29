import heroHomeImg from '../assets/images/hero_houston_home_insulation_1790690366740.jpg';
import atticServiceImg from '../assets/images/service_attic_insulation_1790690387759.jpg';
import wallServiceImg from '../assets/images/service_wall_cavity_insulation_1790690404098.jpg';
import sprayFoamServiceImg from '../assets/images/service_spray_foam_insulation_1790690420132.jpg';
import floorServiceImg from '../assets/images/service_floor_foundation_insulation_1790690435707.jpg';

export interface ServiceItem {
  id: string;
  index: string;
  name: string;
  shortTitle: string;
  category: string;
  summary: string;
  idealFor: string;
  keyBenefits: string[];
  applicationAreas: string[];
  image: string;
  imageAlt: string;
  featured?: boolean;
}

export interface ProblemSymptom {
  id: string;
  symptom: string;
  areaAffected: string;
  rootCause: string;
  recommendedSolution: string;
  recommendedServiceId: string;
}

export interface EducationPillar {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  buildingScienceNote: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
}

export interface BeforeAfterAssembly {
  id: string;
  label: string;
  zoneName: string;
  beforeTitle: string;
  beforeConditions: string[];
  afterTitle: string;
  afterConditions: string[];
  conceptualImage: string;
  conceptualAlt: string;
}

export interface ServiceAreaLocation {
  id: string;
  name: string;
  region: string;
  zipExamples: string;
  propertyFocus: string;
  climateNote: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Attics' | 'Insulation Installation' | 'Residential Properties' | 'Commercial Properties' | 'Work Areas';
  locationContext: string;
  description: string;
  image: string;
  imageAlt: string;
  disclosureLabel: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const IMAGES = {
  heroHome: heroHomeImg,
  atticService: atticServiceImg,
  wallService: wallServiceImg,
  sprayFoamService: sprayFoamServiceImg,
  floorService: floorServiceImg,
} as const;

export const SITE_SECTIONS = [
  { id: 'top', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'problem-solution', label: 'Comfort Diagnosis' },
  { id: 'why-insulation', label: 'Why Insulation' },
  { id: 'about', label: 'About & 4-Step Process' },
  { id: 'before-after', label: 'Before & After' },
  { id: 'why-choose-us', label: 'Why Choose Us' },
  { id: 'service-areas', label: 'Service Areas' },
  { id: 'reviews', label: 'Customer Reviews' },
  { id: 'gallery', label: 'Project Gallery' },
  { id: 'faq', label: 'FAQ' },
  { id: 'estimate', label: 'Free Estimate' },
  { id: 'contact', label: 'Contact Info' },
] as const;

let imagesPreloaded = false;
export function preloadSiteImages(): void {
  if (imagesPreloaded || typeof window === 'undefined') return;
  imagesPreloaded = true;
  Object.values(IMAGES).forEach((src) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = src;
  });
}

export const BUSINESS_INFO = {
  name: 'Houston Insulation Service',
  domain: 'houstoninsulationservice.com',
  phoneDisplay: '(713) 936-2810',
  phoneTel: 'tel:7139362810',
  phoneVerificationNote:
    'Direct dispatch line for residential and commercial insulation estimates across Greater Houston and Southeast Texas.',
  email: 'info@houstoninsulationservice.com',
  cityState: 'Houston, Texas',
  regionSummary: 'Greater Houston & Southeast Texas',
  addressDisplay: 'Houston, TX (Serving Greater Houston Metro & Southeast Texas)',
  hoursDisplay: 'Monday – Friday: 7:00 AM – 6:00 PM · Saturday: 8:00 AM – 2:00 PM',
  mapsDisplay: 'Houston Metro Service Area · Harris, Fort Bend & Montgomery Counties',
  propertyTypes: ['Residential Homes', 'Commercial Buildings', 'Industrial Facilities'],
} as const;

export const TRUST_STRIP_ITEMS = [
  {
    label: 'Local Houston & Southeast Texas Service',
    detail: 'Serving Greater Houston, Cypress, Champions, Tomball, Stafford, Richmond & Rosenberg',
  },
  {
    label: 'Residential, Commercial & Industrial',
    detail: 'Tailored insulation solutions for single-family homes, offices, and commercial structures',
  },
  {
    label: 'Complimentary Estimates',
    detail: 'No-obligation consultations to assess your attic, walls, floors, and building envelope',
  },
  {
    label: 'Full-Envelope Solutions',
    detail: 'Attic, roof, wall cavity, subfloor, spray foam, radiant barrier & insulation removal',
  },
] as const;

export const VERIFIED_SERVICES: ServiceItem[] = [
  {
    id: 'attic-roof-insulation',
    index: '01',
    name: 'Attic, Roof & Loft Insulation',
    shortTitle: 'Attic & Roof Insulation',
    category: 'Primary Thermal Barrier',
    summary:
      'Reduce downward heat transfer from sun-baked Texas roof decks and help keep conditioned air inside your living spaces year-round.',
    idealFor: 'Single-family homes with hot upstairs rooms, older settled attic insulation, or exposed ceiling joists.',
    keyBenefits: [
      'Slows radiant and conductive heat transfer through the roof assembly during Houston summers',
      'Helps maintain steadier temperatures between first- and second-floor living areas',
      'Reduces continuous run-time and mechanical wear on residential and commercial HVAC equipment',
      'Available in fiberglass batt, blown-in fiberglass, and radiant barrier foil configurations',
    ],
    applicationAreas: ['Attic floors & ceiling joists', 'Roof rafters & loft spaces', 'Knee walls & attic hatches'],
    image: IMAGES.atticService,
    imageAlt: 'Clean residential attic space in Houston with newly installed thermal batt and blown-in insulation between pine rafters',
    featured: true,
  },
  {
    id: 'wall-cavity-insulation',
    index: '02',
    name: 'Cavity & Interior Wall Insulation',
    shortTitle: 'Wall Cavity Insulation',
    category: 'Lateral Heat & Draft Control',
    summary:
      'Fill hollow exterior and interior wall cavities with dense fibrous insulation to limit lateral heat transfer, convection drafts, and outdoor noise.',
    idealFor: 'Older Houston homes with uninsulated exterior walls, room additions, or renovations.',
    keyBenefits: [
      'Minimizes heat loss and unwanted summer heat gain through exterior building walls',
      'Reduces internal air convection loops within hollow stud cavities',
      'Can be installed in open framing or retrofitted into existing enclosed wall cavities',
      'Improves room-to-room acoustic privacy and exterior noise dampening',
    ],
    applicationAreas: ['Exterior perimeter walls', 'Garage-to-house shared walls', 'Remodel & addition framing'],
    image: IMAGES.wallService,
    imageAlt: 'Interior timber wall framing with high-density thermal cavity insulation fitted cleanly between wood studs',
    featured: true,
  },
  {
    id: 'spray-foam-insulation',
    index: '03',
    name: 'Spray Foam Insulation',
    shortTitle: 'Spray Foam Insulation',
    category: 'Air Sealing & Thermal Envelope',
    summary:
      'Combine thermal insulation and an air barrier in a single application to seal irregular cavities, roof decks, and commercial structures against humid outdoor air.',
    idealFor: 'Unvented attic roof decks, custom homes, metal or commercial buildings, and high-leakage rim joists.',
    keyBenefits: [
      'Expands to fill gaps, penetrations, and irregular framing where air leakage typically occurs',
      'Helps block humid Gulf Coast air infiltration before it reaches interior conditioned spaces',
      'Provides high thermal resistance per inch in tight architectural cavities',
      'Suitable for residential retrofits, new construction, and commercial/industrial buildings',
    ],
    applicationAreas: ['Roof deck undersides', 'Rim & band joists', 'Commercial & industrial envelopes'],
    image: IMAGES.sprayFoamService,
    imageAlt: 'Closed-cell spray foam insulation uniformly applied between structural roof rafters',
  },
  {
    id: 'floor-foundation-insulation',
    index: '04',
    name: 'Floor, Foundation & Crawl Space Insulation',
    shortTitle: 'Floor & Foundation Insulation',
    category: 'Subfloor & Moisture Defense',
    summary:
      'Insulate beneath raised floors, over unconditioned garages, and along foundation or basement perimeters to stabilize floor temperatures and help deter dampness.',
    idealFor: 'Pier-and-beam Houston homes, rooms over garages, and properties with damp subfloor environments.',
    keyBenefits: [
      'Helps prevent heat transfer through uninsulated floors and raised subfloors',
      'Supports moisture and dampness management along foundations and under-floor structures',
      'Helps discourage mold conditions and pest intrusion associated with unsealed crawl spaces',
      'Eliminates uncomfortable floor temperatures in bedrooms above garages',
    ],
    applicationAreas: ['Pier-and-beam subfloors', 'Ceilings beneath bonus rooms over garages', 'Foundation perimeters'],
    image: IMAGES.floorService,
    imageAlt: 'Under-floor thermal insulation neatly secured between solid wood floor joists above a clean foundation space',
  },
  {
    id: 'removal-efficiency-upgrades',
    index: '05',
    name: 'Insulation Removal, Radiant Barrier & Efficiency Upgrades',
    shortTitle: 'Removal & Radiant Barriers',
    category: 'Retrofit & Envelope Renewal',
    summary:
      'Remove old, compressed, or moisture-damaged attic material before installing fresh insulation, radiant barrier foil, or assessing older window and door thermal loss.',
    idealFor: 'Older Southeast Texas properties with degraded attic material, storm dampness, or aging thermal envelopes.',
    keyBenefits: [
      'Safely extracts settled, dusty, or damp insulation prior to installing clean material',
      'Allows inspection and sealing of ceiling penetrations and attic air bypasses',
      'Radiant barrier foil options help reflect solar heat radiating from the roof deck',
      'Holistic evaluation of building-envelope heat loss, including older windows and doors',
    ],
    applicationAreas: ['Aging residential attics', 'Post-leak or dampness restoration', 'Whole-home efficiency retrofits'],
    image: IMAGES.heroHome,
    imageAlt: 'Well-maintained Houston brick residential home with energy-efficient windows and thermally protected roof line',
  },
];

export const PROBLEM_SYMPTOMS: ProblemSymptom[] = [
  {
    id: 'hot-upstairs',
    symptom: 'Upstairs bedrooms or bonus rooms stay noticeably warmer than the rest of the house',
    areaAffected: 'Attic Floor & Roof Deck',
    rootCause:
      'Solar radiation heats Texas roof shingles and attic air well above outdoor temperatures. Without adequate attic or loft insulation, that heat conducts directly through drywall ceilings into upper rooms.',
    recommendedSolution:
      'Upgrading attic depth with blown-in or batt insulation—and adding radiant barrier protection where appropriate—creates a thermal buffer between the roof deck and your living space.',
    recommendedServiceId: 'attic-roof-insulation',
  },
  {
    id: 'uneven-rooms',
    symptom: 'West- or south-facing rooms heat up rapidly every afternoon',
    areaAffected: 'Exterior Wall Cavities',
    rootCause:
      'Uninsulated or under-filled exterior wall cavities allow direct conductive heat transfer and internal convective air loops when sunlight hits brick or siding.',
    recommendedSolution:
      'Installing dense fibrous cavity wall insulation slows lateral heat flow through exterior walls and keeps perimeter rooms closer to your thermostat setting.',
    recommendedServiceId: 'wall-cavity-insulation',
  },
  {
    id: 'constant-hvac',
    symptom: 'Your air conditioner runs almost non-stop during warm Houston weather',
    areaAffected: 'Whole-Building Thermal Envelope',
    rootCause:
      'When conditioned indoor air escapes through unsealed penetrations and outdoor heat enters through the roof, walls, and floors, HVAC systems must cycle continuously to keep up.',
    recommendedSolution:
      'Combining air sealing or spray foam insulation with proper attic and wall thermal coverage reduces the thermal load your heating and cooling equipment has to fight.',
    recommendedServiceId: 'spray-foam-insulation',
  },
  {
    id: 'damp-subfloor',
    symptom: 'Drafty floors, musty odors, or dampness near the foundation or room over the garage',
    areaAffected: 'Subfloor, Crawl Space & Foundation',
    rootCause:
      'Uninsulated subfloors and foundation perimeters expose interior flooring to unconditioned garage heat, ground moisture, humid outdoor air, and potential pest pathways.',
    recommendedSolution:
      'Insulating between floor joists and protecting foundation and crawl-space perimeters helps stabilize floor temperatures and reduce dampness and moisture intrusion.',
    recommendedServiceId: 'floor-foundation-insulation',
  },
];

export const EDUCATION_PILLARS: EducationPillar[] = [
  {
    id: 'comfort-temp',
    index: '01',
    title: 'Consistent Indoor Comfort & Temperature Control',
    subtitle: 'Eliminate Room-to-Room Swings',
    description:
      'Heat naturally moves from warmer areas to cooler areas. In Houston, that means intense outdoor heat pushes inward through your roof and walls for much of the year, while winter cold fronts pull indoor warmth outward.',
    buildingScienceNote:
      'A continuous layer of insulation slows conductive heat flow so rooms stay closer to a single, even temperature from floor to ceiling.',
  },
  {
    id: 'hvac-efficiency',
    index: '02',
    title: 'Energy Efficiency & Reduced HVAC Strain',
    subtitle: 'Lower Mechanical Workload',
    description:
      'When a home or commercial building lacks adequate thermal resistance, cooled or heated air is quickly lost through the building envelope. Your HVAC system has to run longer cycles to maintain the thermostat set point.',
    buildingScienceNote:
      'Reducing unwanted heat gain and heat loss helps decrease unnecessary energy consumption and reduces day-to-day wear and tear on heating and cooling equipment.',
  },
  {
    id: 'air-sealing',
    index: '03',
    title: 'Air Sealing & Convection Control',
    subtitle: 'Stop Uncontrolled Air Leakage',
    description:
      'Thermal insulation works best when paired with control over air movement. Gaps around attic hatches, plumbing stacks, recessed lighting, and hollow wall cavities allow conditioned air to escape and outdoor air to infiltrate.',
    buildingScienceNote:
      'Spray foam insulation and dense cavity fills help restrict convective air loops and draft pathways across the building envelope.',
  },
  {
    id: 'moisture-protection',
    index: '04',
    title: 'Moisture, Dampness & Long-Term Property Protection',
    subtitle: 'Designed for Gulf Coast Humidity',
    description:
      'Southeast Texas properties face high ambient humidity for most of the year. When warm, moisture-laden outdoor air meets cool interior surfaces or uninsulated foundations, condensation and dampness can develop.',
    buildingScienceNote:
      'Properly selected attic, wall, and foundation insulation helps manage moisture movement, deter dampness and mold conditions, and protect structural materials over time.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Contact Us',
    subtitle: 'Tell Us About Your Property',
    description:
      'Reach out using our online estimate request form or by phone during normal business hours (Monday – Friday). Share your property type, location in the Houston area, and the comfort or insulation issues you are experiencing.',
    deliverable: 'Prompt response to schedule a convenient consultation window',
  },
  {
    number: '02',
    title: 'Assessment',
    subtitle: 'Discuss Your Insulation Needs',
    description:
      'We evaluate the areas of concern—such as your attic, roof loft, exterior wall cavities, subfloors, or commercial workspace—to check existing insulation condition, coverage gaps, moisture considerations, and air leakage points.',
    deliverable: 'Clear evaluation of your current building envelope',
  },
  {
    number: '03',
    title: 'Recommendation',
    subtitle: 'Identify an Appropriate Solution',
    description:
      'Based on your property structure and goals, we recommend the right material and approach—whether blown-in or batt fiberglass, cavity wall insulation, spray foam, radiant barrier foil, floor insulation, or removal of old material.',
    deliverable: 'Transparent, no-obligation Free Estimate with scope details',
  },
  {
    number: '04',
    title: 'Professional Service',
    subtitle: 'Complete the Agreed Work',
    description:
      'Our installation crew prepares the work area, removes degraded insulation if agreed, installs the specified insulation evenly and cleanly, and leaves your residential or commercial property tidy and protected.',
    deliverable: 'Completed installation focused on lasting comfort and efficiency',
  },
];

export const BEFORE_AFTER_CONCEPTS: BeforeAfterAssembly[] = [
  {
    id: 'attic-envelope',
    label: 'Attic & Roof Assembly',
    zoneName: 'Upper Thermal Boundary (Attic / Loft)',
    beforeTitle: 'Under-Insulated & Unsealed Attic Space',
    beforeConditions: [
      'Settled, thin, or missing insulation exposes ceiling joists and drywall to intense attic heat',
      'Unsealed plumbing, wiring, and fixture penetrations allow conditioned indoor air to leak upward',
      'Radiant heat from sun-exposed roof decking drives attic temperatures higher on summer afternoons',
      'Second-floor bedrooms remain warm and AC equipment runs extended cycles',
    ],
    afterTitle: 'Properly Insulated & Air-Sealed Attic Assembly',
    afterConditions: [
      'Even, continuous thermal insulation covers ceiling joists to slow conductive heat transfer',
      'Key ceiling bypasses and gaps are sealed prior to installing clean insulation material',
      'Optional radiant barrier foil helps reduce radiant heat transfer from the roof deck',
      'More stable indoor temperatures and reduced strain on heating and cooling systems',
    ],
    conceptualImage: IMAGES.atticService,
    conceptualAlt: 'Conceptual reference showing clean, even attic insulation coverage between timber joists and rafters',
  },
  {
    id: 'wall-envelope',
    label: 'Exterior Wall Cavities',
    zoneName: 'Vertical Building Envelope (Cavity Walls)',
    beforeTitle: 'Hollow or Under-Filled Wall Stud Cavities',
    beforeConditions: [
      'Empty wall cavities allow outdoor heat to conduct rapidly through siding or brick veneers',
      'Internal air convection loops circulate warm and cool air inside the hollow wall space',
      'Perimeter rooms feel noticeably warmer in summer and cooler during winter cold snaps',
      'Outdoor street and neighborhood noise passes easily through hollow framing',
    ],
    afterTitle: 'Dense Fibrous Cavity Wall Insulation',
    afterConditions: [
      'Wall cavities are filled with fibrous thermal material to impede conductive heat flow',
      'Dense fill restricts internal convective air movement within the wall assembly',
      'Interior wall surfaces stay closer to room air temperature for improved occupant comfort',
      'Added sound attenuation reduces exterior noise transfer into bedrooms and offices',
    ],
    conceptualImage: IMAGES.wallService,
    conceptualAlt: 'Conceptual reference showing dense thermal insulation fitted inside residential timber wall stud cavities',
  },
  {
    id: 'floor-envelope',
    label: 'Subfloor & Foundation',
    zoneName: 'Lower Thermal & Moisture Boundary (Floors)',
    beforeTitle: 'Uninsulated Subfloor & Damp Foundation Perimeter',
    beforeConditions: [
      'Heat and humidity from unconditioned crawl spaces or garages transfer directly through floorboards',
      'Exposed subfloors contribute to uneven floor temperatures and seasonal energy loss',
      'Unprotected foundations and basements are more vulnerable to dampness and moisture accumulation',
      'Greater risk of musty indoor air and moisture-related wear on structural wood',
    ],
    afterTitle: 'Insulated Floor Joists & Protected Foundation Space',
    afterConditions: [
      'Thermal insulation installed securely between floor joists slows under-floor heat transfer',
      'Foundation and subfloor insulation helps deter dampness, condensation, and moisture buildup',
      'Rooms above garages and pier-and-beam foundations maintain much steadier comfort',
      'Supports cleaner, drier structural conditions beneath the living space',
    ],
    conceptualImage: IMAGES.floorService,
    conceptualAlt: 'Conceptual reference showing under-floor thermal insulation neatly installed between solid wood floor joists',
  },
];

export const SERVICE_AREAS: ServiceAreaLocation[] = [
  {
    id: 'houston-central',
    name: 'Houston (Central & Greater Metro)',
    region: 'Harris County · Core Service Area',
    zipExamples: '77002, 77007, 77008, 77019, 77024, 77055',
    propertyFocus: 'Historic pier-and-beam bungalows, ranch homes, townhomes, and commercial facilities',
    climateNote:
      'Older inner-loop and mid-century Houston properties frequently benefit from attic insulation removal, cavity wall retrofits, and under-floor thermal protection.',
  },
  {
    id: 'cypress',
    name: 'Cypress, TX',
    region: 'Northwest Greater Houston',
    zipExamples: '77429, 77433',
    propertyFocus: 'Two-story single-family residences, master-planned community homes, and light commercial buildings',
    climateNote:
      'Large roof footprints and high-ceiling two-story layouts in Cypress make attic insulation depth, spray foam, and radiant barriers essential for upstairs comfort.',
  },
  {
    id: 'champions',
    name: 'Champions (Northwest Houston)',
    region: 'North / Northwest Harris County',
    zipExamples: '77069, 77070, 77014',
    propertyFocus: 'Established custom homes, wooded-lot residences, and professional office properties',
    climateNote:
      'Mature homes in the Champions area often have settled original fiberglass insulation and high humidity exposure that call for attic and wall envelope upgrades.',
  },
  {
    id: 'tomball',
    name: 'Tomball, TX',
    region: 'Northern Greater Houston Corridor',
    zipExamples: '77375, 77377',
    propertyFocus: 'Suburban family homes, acreage properties, workshops, and commercial buildings',
    climateNote:
      'Both residential attics and standalone metal or commercial structures in Tomball benefit from spray foam air sealing and fiberglass thermal upgrades.',
  },
  {
    id: 'stafford',
    name: 'Stafford, TX',
    region: 'Southwest Greater Houston',
    zipExamples: '77477, 77497',
    propertyFocus: 'Single-family neighborhoods, office-warehouse spaces, and commercial/industrial facilities',
    climateNote:
      'Stafford homeowners and commercial property managers rely on roof, wall, and spray foam insulation to manage cooling loads across large floorplates.',
  },
  {
    id: 'richmond',
    name: 'Richmond, TX',
    region: 'Fort Bend County · Southwest Corridor',
    zipExamples: '77406, 77407, 77469',
    propertyFocus: 'Established Fort Bend residences, new suburban developments, and commercial spaces',
    climateNote:
      'Topping up under-filled attics and insulating rooms over garages helps Richmond homeowners eliminate warm second-story rooms during peak summer months.',
  },
  {
    id: 'rosenberg',
    name: 'Rosenberg, TX',
    region: 'Fort Bend County · Southeast Texas',
    zipExamples: '77471',
    propertyFocus: 'Single-family homes, historic properties, and growing commercial/industrial developments',
    climateNote:
      'Full-envelope insulation—covering attics, exterior wall cavities, and foundations—helps protect Rosenberg properties against heat and Gulf Coast humidity.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Attic Rafter & Ceiling Joist Thermal Coverage',
    category: 'Attics',
    locationContext: 'Residential Attic Assembly · Thermal Barrier System',
    description:
      'Example of uniform batt and blown-in fiberglass insulation installed between roof rafters and ceiling joists to slow downward heat transfer.',
    image: IMAGES.atticService,
    imageAlt: 'High-quality residential attic thermal insulation installed between timber rafters',
    disclosureLabel: 'Architectural Installation Reference',
  },
  {
    id: 'gal-2',
    title: 'Exterior & Interior Stud Cavity Wall Fill',
    category: 'Insulation Installation',
    locationContext: 'Wall Framing Retrofit · Sound & Thermal Control',
    description:
      'Example of high-density fibrous insulation fitted cleanly between timber wall studs to reduce lateral heat transfer and internal convection.',
    image: IMAGES.wallService,
    imageAlt: 'Dense wall cavity thermal insulation fitted cleanly between wood studs',
    disclosureLabel: 'Architectural Installation Reference',
  },
  {
    id: 'gal-3',
    title: 'Closed-Cell Spray Foam Roof Deck Air Sealing',
    category: 'Commercial Properties',
    locationContext: 'Roof Deck & Structural Envelope · Air Barrier Seal',
    description:
      'Example of spray foam insulation applied along roof rafters to provide combined thermal resistance and air-barrier sealing for residential or commercial roofs.',
    image: IMAGES.sprayFoamService,
    imageAlt: 'Closed-cell spray foam insulation applied uniformly to timber roof deck rafters',
    disclosureLabel: 'Architectural Installation Reference',
  },
  {
    id: 'gal-4',
    title: 'Subfloor & Foundation Joist Insulation',
    category: 'Work Areas',
    locationContext: 'Under-Floor & Foundation Space · Moisture Defense',
    description:
      'Example of subfloor insulation secured between floor joists to reduce heat loss and help protect foundation areas against dampness and moisture.',
    image: IMAGES.floorService,
    imageAlt: 'Under-floor insulation installed cleanly between solid wood floor joists',
    disclosureLabel: 'Architectural Installation Reference',
  },
  {
    id: 'gal-5',
    title: 'Greater Houston Single-Family Thermal Envelope',
    category: 'Residential Properties',
    locationContext: 'Southeast Texas Residential Architecture · Whole-Home Scope',
    description:
      'Representative Texas brick-and-stone residence illustrating a complete building-envelope approach across roof, walls, floors, and windows.',
    image: IMAGES.heroHome,
    imageAlt: 'Energy-efficient brick residential home in Houston, Texas with full envelope insulation',
    disclosureLabel: 'Architectural Installation Reference',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-types',
    category: 'Materials & Options',
    question: 'What types of insulation are available?',
    answer:
      'Houston Insulation Service offers solutions suited to different parts of a residential, commercial, or industrial property. Common options include fiberglass attic insulation (batt and blown-in), dense fibrous cavity wall insulation, spray foam insulation, radiant barrier foil, and under-floor or foundation insulation, as well as safe removal of old or degraded insulation material.',
  },
  {
    id: 'faq-signs',
    category: 'Home Assessment',
    question: 'How do I know if my home needs more insulation?',
    answer:
      'Common indicators include uneven indoor temperatures from room to room, upstairs bedrooms that stay uncomfortably warm in the afternoon, air conditioning or heating equipment that runs constantly, drafts around walls or floors, dampness near the foundation or subfloor, or attic insulation that has settled below the tops of the ceiling joists.',
  },
  {
    id: 'faq-areas',
    category: 'Property Coverage',
    question: 'What areas of a home can be insulated?',
    answer:
      'A complete building envelope includes the attic floor, roof deck and loft spaces, exterior and interior wall cavities, floors above unconditioned garages or pier-and-beam crawl spaces, and foundation or basement perimeters. We also discuss how aging windows and doors factor into overall heat loss and comfort.',
  },
  {
    id: 'faq-duration',
    category: 'Project Timeline',
    question: 'How long does insulation installation take?',
    answer:
      'Installation time depends on the size of your property, accessibility of the work areas, whether old insulation needs to be removed first, and the type of insulation selected. Many standard residential attic upgrades can be completed within a single scheduled workday, while larger whole-home or commercial projects are scheduled with a clear timeline during your consultation.',
  },
  {
    id: 'faq-comfort',
    category: 'Comfort & Efficiency',
    question: 'Can insulation improve home comfort?',
    answer:
      'Yes. Proper insulation slows the movement of heat into your home during hot Houston summers and helps retain warmth during cooler winter weather. By reducing unwanted heat transfer and air leakage, insulation helps stabilize indoor temperatures, reduces hot and cold spots, and lessens the daily workload on your HVAC system.',
  },
  {
    id: 'faq-estimates',
    category: 'Pricing & Consultation',
    question: 'Do you provide free estimates?',
    answer:
      'Yes. We provide complimentary, no-obligation estimates for homeowners and commercial property owners across Houston, Cypress, Champions, Tomball, Stafford, Richmond, Rosenberg, and surrounding Southeast Texas communities. Simply submit our online estimate form or contact us during normal business hours (Monday – Friday).',
  },
];
