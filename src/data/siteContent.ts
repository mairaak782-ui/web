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

export interface BenefitPillar {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  scienceNote: string;
}

export interface HoustonPropertyPillar {
  id: string;
  title: string;
  challenge: string;
  solution: string;
  highlight: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
}

export interface TrustItem {
  title: string;
  description: string;
  tag: string;
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
  { id: 'why-spray-foam', label: 'Why Spray Foam' },
  { id: 'houston-solutions', label: 'Houston Properties' },
  { id: 'process', label: 'Our 4-Step Process' },
  { id: 'trust', label: 'Why Choose Us' },
  { id: 'faq', label: 'FAQ' },
  { id: 'estimate', label: 'Free Estimate' },
  { id: 'contact', label: 'Contact' },
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
  name: 'Houston Spray Foam Insulation',
  phoneDisplay: '713-497-1773',
  phoneTel: 'tel:7134971773',
  phoneNote: 'Direct phone line for free estimates and inquiries across Houston, TX.',
  email: 'houstonsprayfoaminsulationtx@gmail.com',
  cityState: 'Houston, Texas',
  locationDisplay: 'Houston, TX',
  regionSummary: 'Serving Houston, TX and Surrounding Greater Houston Areas',
  hoursDisplay: 'Monday – Friday: 7:00 AM – 6:00 PM · Saturday: By Appointment',
  propertyTypes: ['Residential', 'Commercial', 'New Construction', 'Renovation', 'Other'],
  servicesList: [
    'Spray Foam Insulation',
    'Attic Insulation',
    'Residential Insulation',
    'Commercial Insulation',
    'New Construction & Renovation',
    'Energy-Efficiency Improvements',
    'Not Sure',
  ],
} as const;

export const TRUST_STRIP_ITEMS = [
  {
    label: 'Houston-Focused Service',
    detail: 'Tailored insulation solutions designed specifically for Southeast Texas climate conditions',
  },
  {
    label: 'Residential & Commercial Scope',
    detail: 'Experienced with single-family homes, multi-story residences, offices, and commercial buildings',
  },
  {
    label: 'Complimentary Estimates',
    detail: 'No-obligation consultations to assess your attic, walls, or commercial structure',
  },
  {
    label: 'Quality-Focused Approach',
    detail: 'Clear communication, meticulous site preparation, and professional insulation practices',
  },
] as const;

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'spray-foam-insulation',
    index: '01',
    name: 'Spray Foam Insulation',
    shortTitle: 'Spray Foam Insulation',
    category: 'High-Performance Thermal & Air Barrier',
    summary:
      'Creates a continuous insulation and air-sealing layer that expands to seal gaps, cracks, and irregular framing cavities where traditional materials often fall short.',
    idealFor: 'Unvented attic rooflines, exterior wall assemblies, rim joists, and properties needing thorough air sealing.',
    keyBenefits: [
      'Helps create an effective air-sealing and thermal barrier in a single application',
      'Fills penetrations and hard-to-reach voids to reduce outdoor air infiltration',
      'Provides high thermal resistance per inch of installed thickness',
      'Helps limit uncontrolled humid air movement into conditioned living spaces',
    ],
    applicationAreas: ['Roof decks & unvented attics', 'Exterior stud wall cavities', 'Band & rim joists', 'Crawl space perimeters'],
    image: IMAGES.sprayFoamService,
    imageAlt: 'Professional spray foam insulation applied uniformly between structural roof deck rafters in Houston',
    featured: true,
  },
  {
    id: 'attic-insulation',
    index: '02',
    name: 'Attic Insulation',
    shortTitle: 'Attic Insulation',
    category: 'Upper Thermal Envelope & Heat Defense',
    summary:
      'Protect your home against extreme Houston summer attic heat transfer by upgrading the thermal barrier along your attic floor or roof deck.',
    idealFor: 'Homes with warm upstairs rooms, aging or settled attic material, and high summer cooling demands.',
    keyBenefits: [
      'Slows downward heat transfer from sun-baked Texas roof decks into living spaces',
      'Helps maintain more even temperatures between first and second floors',
      'Reduces the daily workload on air conditioning equipment during hot afternoons',
      'Supports improved overall energy efficiency throughout the year',
    ],
    applicationAreas: ['Attic floors & ceiling joists', 'Roof rafters & kneewalls', 'Attic access hatches & pull-down stairs'],
    image: IMAGES.atticService,
    imageAlt: 'Clean residential attic insulation installed between roof framing rafters in Houston TX',
    featured: true,
  },
  {
    id: 'residential-insulation',
    index: '03',
    name: 'Residential Insulation',
    shortTitle: 'Residential Insulation',
    category: 'Home Comfort & Additions',
    summary:
      'Tailored insulation solutions for single-family residences, townhomes, room additions, and whole-house energy retrofits across Houston.',
    idealFor: 'Homeowners seeking better indoor comfort, quieter rooms, and improved temperature consistency.',
    keyBenefits: [
      'Addresses uneven room temperatures and hot or cold spots in the home',
      'Helps dampen exterior noise from neighborhood traffic and storms',
      'Customized solutions for exterior walls, bonus rooms over garages, and floors',
      'Enhances year-round indoor living comfort for your family',
    ],
    applicationAreas: ['Single-family homes', 'Bonus rooms & garage ceilings', 'Home extensions & remodels'],
    image: IMAGES.heroHome,
    imageAlt: 'Houston Texas single-family home with energy-efficient residential insulation envelope',
    featured: true,
  },
  {
    id: 'commercial-insulation',
    index: '04',
    name: 'Commercial Insulation',
    shortTitle: 'Commercial Insulation',
    category: 'Commercial Buildings & Workspaces',
    summary:
      'Professional spray foam and thermal insulation services for commercial offices, retail properties, warehouses, metal buildings, and light industrial facilities.',
    idealFor: 'Commercial property managers, business owners, and general contractors requiring reliable thermal performance.',
    keyBenefits: [
      'Helps stabilize indoor temperatures across large open floor plans and high ceilings',
      'Improves building air sealing to reduce conditioned air loss',
      'Suitable for metal structures, concrete envelopes, and commercial rooflines',
      'Supports efficient mechanical HVAC operation in commercial spaces',
    ],
    applicationAreas: ['Commercial roof decks', 'Metal building envelopes', 'Warehouse perimeter walls', 'Office workspaces'],
    image: IMAGES.wallService,
    imageAlt: 'Commercial building framing with high-density thermal insulation installed in Houston TX',
  },
  {
    id: 'new-construction-renovation',
    index: '05',
    name: 'New Construction & Renovation',
    shortTitle: 'New Construction & Renovation',
    category: 'Framing Stage & Structural Retrofits',
    summary:
      'Incorporate high-performance spray foam and thermal insulation during the framing phase of new builds, structural renovations, and major additions.',
    idealFor: 'Custom home builders, remodelers, and property owners planning new construction or gut renovations.',
    keyBenefits: [
      'Seamlessly seals the building envelope before drywall installation',
      'Allows optimal access to all exterior framing, soffits, and ceiling junctions',
      'Ensures modern thermal performance standards are built directly into the structure',
      'Coordinates cleanly with general contractor and mechanical project timelines',
    ],
    applicationAreas: ['New residential construction', 'Major home additions', 'Gut renovation projects', 'Custom builder specs'],
    image: IMAGES.floorService,
    imageAlt: 'Insulation installed during timber framing stage of a new construction home in Houston TX',
  },
  {
    id: 'energy-efficiency-improvements',
    index: '06',
    name: 'Energy-Efficiency Improvements',
    shortTitle: 'Energy-Efficiency Improvements',
    category: 'Whole-Envelope Optimization',
    summary:
      'Identify and address primary sources of heat transfer and air leakage across your building envelope to help improve overall property efficiency.',
    idealFor: 'Properties with high energy consumption, continuous AC cycling, or noticeable draft patterns.',
    keyBenefits: [
      'Targets critical air bypasses around penetrations, wiring, and fixtures',
      'Helps prevent convective air looping within hollow wall and ceiling assemblies',
      'Supports steadier indoor climate control with less mechanical strain',
      'Tailored recommendations based on your specific property construction',
    ],
    applicationAreas: ['Air leakage junctions', 'Chases & dropped soffits', 'Whole-property thermal boundaries'],
    image: IMAGES.sprayFoamService,
    imageAlt: 'Precision spray foam insulation sealing air gaps along building structural rafters',
  },
];

export const WHY_SPRAY_FOAM_PILLARS: BenefitPillar[] = [
  {
    id: 'air-sealing',
    index: '01',
    title: 'Improved Air Sealing',
    subtitle: 'Creates a Continuous Air Barrier',
    description:
      'Unlike fibrous materials that air can move through, spray foam expands on contact to fill irregular framing cavities, cracks, and penetrations. This helps create an effective air barrier that restricts uncontrolled air infiltration.',
    scienceNote:
      'Sealing air gaps can help prevent outdoor heat and Gulf Coast humidity from entering your conditioned spaces.',
  },
  {
    id: 'temp-consistency',
    index: '02',
    title: 'Better Temperature Consistency',
    subtitle: 'Reduce Hot & Cold Spots',
    description:
      'By providing continuous coverage along rooflines and wall assemblies, spray foam helps eliminate thermal bridging and convective loops, supporting more uniform temperatures across different rooms and floors.',
    scienceNote:
      'Helps upstairs rooms and perimeter walls maintain temperatures closer to your central thermostat setting.',
  },
  {
    id: 'unwanted-air-movement',
    index: '03',
    title: 'Reduced Unwanted Air Movement',
    subtitle: 'Blocks Drafts & Dust Infiltration',
    description:
      'Uncontrolled air movement carries heat, outdoor dust, and humidity into the building. Spray foam forms a tight seal around framing joints, electrical boxes, and plumbing runs to minimize draft pathways.',
    scienceNote:
      'Restricting draft paths helps create a cleaner, more controlled indoor environment.',
  },
  {
    id: 'potential-savings',
    index: '04',
    title: 'Potential Energy Savings',
    subtitle: 'Reduces HVAC Workload',
    description:
      'When your building envelope is well-sealed and insulated, cooled air stays inside longer. This can help reduce the continuous cycling demand on your air conditioning equipment during intense Houston summers.',
    scienceNote:
      'Actual energy savings may vary depending on the property layout, HVAC equipment, and installation scope.',
  },
  {
    id: 'indoor-comfort',
    index: '05',
    title: 'Improved Indoor Comfort',
    subtitle: 'Steadier Living Spaces',
    description:
      'A properly insulated building envelope helps keep interior wall surfaces and ceilings at more stable temperatures, reducing the radiant heat sensation you feel when sitting near exterior walls or beneath attics.',
    scienceNote:
      'Enhances comfort in bedrooms, bonus rooms above garages, and home office workspaces.',
  },
  {
    id: 'long-term-performance',
    index: '06',
    title: 'Long-Term Insulation Performance',
    subtitle: 'Resistant to Settling & Sagging',
    description:
      'Spray foam adheres directly to structural substrates, maintaining its shape and thermal coverage over time without sagging, compressing, or settling away from framing members.',
    scienceNote:
      'Provides durable building envelope protection that maintains its integrity for years.',
  },
];

export const HOUSTON_PROPERTY_PILLARS: HoustonPropertyPillar[] = [
  {
    id: 'summer-attic-heat',
    title: 'High Summer Temperatures & Radiant Attic Heat',
    challenge:
      'During Houston summers, direct sunlight on roof shingles can push attic temperatures well above 130°F. Without an effective thermal barrier, this heat conducts directly through ceilings into living spaces below.',
    solution:
      'Applying spray foam insulation directly to the underside of the roof deck creates an unvented, conditioned attic space that keeps attic temperatures much closer to interior living conditions.',
    highlight: 'Significantly slows downward heat transfer into second-floor bedrooms and living areas.',
  },
  {
    id: 'gulf-coast-humidity',
    title: 'Gulf Coast Humidity & Air Leakage',
    challenge:
      'Southeast Texas experiences high ambient humidity. When humid outdoor air infiltrates hollow wall cavities and attic spaces, it introduces moisture and increases the cooling load on HVAC systems.',
    solution:
      'Spray foam acts as both a thermal insulator and an air barrier, helping seal framing joints and penetrations against humid outdoor air intrusion.',
    highlight: 'Restricts moisture-laden outdoor air infiltration before it reaches indoor living spaces.',
  },
  {
    id: 'hvac-continuous-cycling',
    title: 'HVAC Strain & Constant Cycling',
    challenge:
      'In unsealed or under-insulated properties, conditioned air quickly escapes through ceiling fixtures and bypasses, forcing air conditioning units to run almost continuously to keep up.',
    solution:
      'Tightening the building envelope with spray foam reduces continuous thermal loss and air leaks, helping your cooling system maintain set points with less mechanical strain.',
    highlight: 'Helps support efficient HVAC performance and less continuous runtime.',
  },
  {
    id: 'diverse-architecture',
    title: 'Diverse Houston Residential & Commercial Architecture',
    challenge:
      'Houston properties range from historic pier-and-beam bungalows and 1970s suburban ranches to modern custom homes, commercial warehouses, and metal buildings with unique framing requirements.',
    solution:
      'Spray foam adapts to irregular framing shapes, deep roof pitches, metal building purlins, and subfloors to provide continuous coverage where conventional batts cannot fit tightly.',
    highlight: 'Versatile application for new builds, remodels, metal buildings, and residential retrofits.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Request an Estimate',
    subtitle: 'Share Your Project Details',
    description:
      'Submit our online estimate form or call 713-497-1773. Tell us about your residential or commercial property in Houston and what areas you are looking to insulate.',
    deliverable: 'Prompt initial consultation to review your goals and schedule an assessment',
  },
  {
    number: '02',
    title: 'Discuss Your Insulation Needs',
    subtitle: 'On-Site Property Review',
    description:
      'We discuss your specific structure—whether an attic roof deck, exterior wall retrofit, new construction framing, or commercial space—to evaluate accessibility and thermal needs.',
    deliverable: 'Clear evaluation of your property’s building envelope requirements',
  },
  {
    number: '03',
    title: 'Receive a Recommended Solution',
    subtitle: 'Transparent, No-Obligation Estimate',
    description:
      'We provide a straightforward recommendation tailored to your property, outlining the recommended spray foam or attic insulation scope with transparent pricing.',
    deliverable: 'Detailed Free Estimate with clear scope of work and no high-pressure tactics',
  },
  {
    number: '04',
    title: 'Schedule the Work',
    subtitle: 'Professional, Quality-Focused Execution',
    description:
      'Our team coordinates a convenient installation window, prepares the work area thoroughly, applies the insulation with precision, and completes a thorough cleanup of the site.',
    deliverable: 'Completed insulation application focused on lasting comfort and performance',
  },
];

export const TRUST_PILLARS: TrustItem[] = [
  {
    title: 'Clear Communication',
    description:
      'We explain our recommendations in plain English, discuss what spray foam can and cannot do for your property, and provide transparent written estimates.',
    tag: 'Straightforward Service',
  },
  {
    title: 'Professional Service',
    description:
      'From initial phone call to project cleanup, we treat your home or commercial building with respect, maintaining clean work areas and prompt scheduling.',
    tag: 'Dedicated Craftsmanship',
  },
  {
    title: 'Quality-Focused Approach',
    description:
      'We use proper application techniques and site preparation to ensure uniform coverage, effective adhesion, and durable building-envelope sealing.',
    tag: 'Reliable Standards',
  },
  {
    title: 'Houston-Focused Service',
    description:
      'We understand the specific insulation challenges posed by Houston’s intense summer heat, high attic temperatures, and Gulf Coast humidity.',
    tag: 'Local Climate Focus',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-what-is',
    category: 'General Basics',
    question: 'What is spray foam insulation?',
    answer:
      'Spray foam insulation is a high-performance material applied as a liquid that quickly expands to fill framing cavities, gaps, and voids. Once cured, it creates a continuous thermal insulation layer and an effective air barrier that helps restrict unwanted air movement and heat transfer.',
  },
  {
    id: 'faq-where-installed',
    category: 'Applications',
    question: 'Where can spray foam insulation be installed?',
    answer:
      'Spray foam insulation is commonly installed along residential and commercial attic roof decks, exterior wall cavities, band and rim joists, crawl spaces and subfloors, as well as metal buildings, commercial warehouses, and new construction framing.',
  },
  {
    id: 'faq-suitable-attics',
    category: 'Attic Solutions',
    question: 'Is spray foam insulation suitable for attics?',
    answer:
      'Yes. Spray foam is frequently applied to the underside of attic roof decks to create an unvented (conditioned) attic assembly. In Houston, this can significantly reduce attic heat buildup and help keep upper-floor living spaces more comfortable during peak summer weather.',
  },
  {
    id: 'faq-which-solution',
    category: 'Consultation',
    question: 'How do I know which insulation solution I need?',
    answer:
      'The right solution depends on your property type, existing insulation condition, architectural framing, and comfort concerns. When you contact Houston Spray Foam Insulation, we discuss your property details and recommend an appropriate scope—whether targeting the attic roof deck, exterior walls, or whole building envelope.',
  },
  {
    id: 'faq-how-estimate',
    category: 'Estimates & Pricing',
    question: 'How can I request an estimate?',
    answer:
      'You can request a complimentary estimate by filling out our simple online quote form on this page or by calling us directly at 713-497-1773 during normal business hours (Monday – Friday). We will discuss your project details and provide a no-obligation quote.',
  },
  {
    id: 'faq-res-comm',
    category: 'Property Types',
    question: 'Do you provide residential and commercial insulation services?',
    answer:
      'Yes. Houston Spray Foam Insulation serves residential properties (including single-family homes, townhomes, additions, and renovations) as well as commercial properties (including offices, metal buildings, retail spaces, and warehouses) throughout Houston, TX.',
  },
];
