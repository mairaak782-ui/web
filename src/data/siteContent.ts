import heroHomeImg from '../assets/images/hero_houston_home_insulation_1790690366740.jpg';
import atticServiceImg from '../assets/images/service_attic_insulation_1790690387759.jpg';
import wallServiceImg from '../assets/images/service_wall_cavity_insulation_1790690404098.jpg';
import sprayFoamServiceImg from '../assets/images/service_spray_foam_insulation_1790690420132.jpg';
import floorServiceImg from '../assets/images/service_floor_foundation_insulation_1790690435707.jpg';
import logoImg from '../assets/images/dr_foam_logo_1790709057711.jpg';

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

export interface OntarioPropertyPillar {
  id: string;
  title: string;
  challenge: string;
  solution: string;
  highlight: string;
  badge: string;
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
  logo: logoImg,
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
  { id: 'ontario-solutions', label: 'Ontario Properties' },
  { id: 'process', label: '4-Step Prescription' },
  { id: 'trust', label: 'Why Dr. Foam' },
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
  name: 'Dr Foam Insulation Ltd.',
  brandTagline: 'Keep your home warm in winter, cool in summer, and your bills steady.',
  heroHook: "Your energy bill shouldn't act like it's at Canada's Wonderland. Unless you enjoy paying for excitement!",
  shortName: 'Dr. Foam',
  domain: 'drfoam.ca',
  phoneDisplay: '705-733-1163',
  phoneTel: 'tel:7057331163',
  phoneFormatted: '(705) 733-1163',
  phoneNote: 'Direct line for residential & commercial estimates from Barrie to North Bay, ON.',
  email: 'sales.drfoam@gmail.com',
  instagram: 'https://instagram.com/dr_foam_insulation_ltd/',
  instagramHandle: '@dr_foam_insulation_ltd',
  cityState: 'Barrie to North Bay, ON',
  locationDisplay: 'Barrie to North Bay, ON',
  province: 'Ontario, Canada',
  regionSummary: 'Serving Barrie, Orillia, Muskoka, Huntsville, Parry Sound, North Bay & Central Ontario',
  hoursDisplay: 'Monday – Saturday: 7:00 AM – 6:00 PM · Emergency & Weekend Consultations Available',
  serviceCoverageAreas: [
    'Barrie & Innisfil',
    'Orillia & Lake Country',
    'Gravenhurst & Bracebridge',
    'Huntsville & Lake of Bays',
    'Muskoka & Cottage Country',
    'Parry Sound & Georgian Bay',
    'Almaguin Highlands & Sundridge',
    'North Bay & Callander',
    'Midland & Penetanguishene',
    'Severn & Coldwater',
  ],
} as const;

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'spray-foam',
    index: '01',
    name: 'Spray Foam Insulation',
    shortTitle: 'Spray Foam Insulation',
    category: 'Thermal & Air Barrier',
    summary:
      'High-performance 2lb closed-cell and open-cell spray foam insulation applied by Dr. Foam technicians to deliver an unbroken air, thermal, and vapor seal for Ontario structures.',
    idealFor:
      'Homes, cottages, exterior wall cavities, cathedral ceilings, rim joists, and pole barns.',
    keyBenefits: [
      'Expands instantly to seal air gaps, micro-drafts, and wall penetrations',
      'Provides high R-value per inch suited for harsh Ontario freeze-thaw cycles',
      'Acts as a continuous barrier against moisture, humidity, and winter condensation',
      'Helps maintain steady year-round indoor temperatures across all seasons',
    ],
    applicationAreas: ['Wall Cavities', 'Cathedral Ceilings', 'Rim Joists', 'Cantilevers', 'Outbuildings'],
    image: IMAGES.sprayFoamService,
    imageAlt: 'Professional spray foam insulation application by Dr Foam Insulation Ltd in Ontario',
    featured: true,
  },
  {
    id: 'attic-insulation',
    index: '02',
    name: 'Attic Insulation & Air Sealing',
    shortTitle: 'Attic Insulation',
    category: 'Roof Deck & Ceiling Planes',
    summary:
      'Comprehensive attic thermal envelope sealing engineered to stop heated indoor air from escaping into the roof space during brutal Ontario winters and stop radiant heat baking during summers.',
    idealFor:
      'Existing homes with high heating bills, drafty upper floors, cold ceilings, and winter ice dam formation.',
    keyBenefits: [
      'Mitigates dangerous winter ice-damming along roof eaves and soffits',
      'Reduces heavy winter heating loads and prevents summertime upper-floor heat traps',
      'Seals critical bypasses around pot lights, plumbing stacks, and chimney chases',
      'Helps stabilize energy demands across volatile seasonal weather swings',
    ],
    applicationAreas: ['Attic Flat Floors', 'Roof Deck Rafters', 'Soffit Transitions', 'Attic Access Hatches'],
    image: IMAGES.atticService,
    imageAlt: 'Attic insulation and air sealing installation by Dr. Foam in an Ontario residential property',
    featured: true,
  },
  {
    id: 'residential-insulation',
    index: '03',
    name: 'Residential & Cottage Insulation',
    shortTitle: 'Residential & Cottages',
    category: 'Homes & Waterfront Properties',
    summary:
      'Tailored insulation retrofits and upgrades for single-family homes, four-season waterfront cottages, chalets, and home additions throughout the Barrie-to-North Bay corridor.',
    idealFor:
      'Year-round homes, four-season converted cottages, drafty older houses, and room additions.',
    keyBenefits: [
      'Transforms drafty cottages into cozy, easily heated four-season retreats',
      'Prevents cold bedroom floors over unconditioned crawlspaces or garages',
      'Improves acoustic sound dampening between interior living areas and exterior wind',
      'Protects plumbing pipes from freezing during severe sub-zero cold snaps',
    ],
    applicationAreas: ['Whole-Home Envelopes', 'Cottage Additions', 'Basements', 'Crawlspaces', 'Bonus Rooms'],
    image: IMAGES.wallService,
    imageAlt: 'Residential and cottage insulation project in Muskoka and Ontario by Dr Foam',
  },
  {
    id: 'commercial-insulation',
    index: '04',
    name: 'Commercial & Agricultural Insulation',
    shortTitle: 'Commercial & Agricultural',
    category: 'Commercial & Industrial',
    summary:
      'Heavy-duty thermal and moisture insulation for commercial facilities, fabrication shops, agricultural barns, storage units, and steel-frame buildings.',
    idealFor:
      'Commercial warehouses, workshops, auto garages, agricultural structures, and multi-unit facilities.',
    keyBenefits: [
      'Controls temperature and eliminates metal roof condensation dripping in shops and barns',
      'Reduces commercial HVAC operating overhead across expansive interior square footage',
      'Reinforces structural rigidity when closed-cell foam adheres to metal and wood framing',
      'Enables rapid application on large surfaces with minimal downtime to operations',
    ],
    applicationAreas: ['Metal Buildings', 'Workshops', 'Commercial Units', 'Agricultural Barns', 'Warehouses'],
    image: IMAGES.floorService,
    imageAlt: 'Commercial spray foam application in an industrial shop building in Ontario',
  },
  {
    id: 'new-construction-renovation',
    index: '05',
    name: 'New Construction & Renovation',
    shortTitle: 'New Construction & Renos',
    category: 'Builders & Remodels',
    summary:
      'Precision insulation planning and execution for custom home builders, renovation contractors, and property owners seeking code-exceeding building envelope performance.',
    idealFor:
      'New custom builds, gut-rehabs, basement finishes, kitchen/bath additions, and garage conversions.',
    keyBenefits: [
      'Integrates cleanly into construction timelines before drywall installation',
      'Creates an airtight building envelope that surpasses standard Ontario building code targets',
      'Maximizes interior usable square footage with superior R-value per inch of stud depth',
      'Provides peace of mind for homeowners and general contractors alike',
    ],
    applicationAreas: ['Framing Stud Cavities', 'Cathedral Rafters', 'Basement Perimeter Walls', 'Garage Ceilings'],
    image: IMAGES.wallService,
    imageAlt: 'New construction framing spray foam insulation installed before drywalling',
  },
  {
    id: 'basement-crawlspace',
    index: '06',
    name: 'Basement & Crawlspace Encapsulation',
    shortTitle: 'Basements & Crawlspaces',
    category: 'Foundation & Below-Grade',
    summary:
      'Complete moisture and thermal barrier systems for damp basements, stone foundations, and exposed crawlspaces typical of Central Ontario and cottage properties.',
    idealFor:
      'Cold foundation walls, rocky or dirt-floor crawlspaces, and cottages prone to freezing pipes.',
    keyBenefits: [
      'Stops ground moisture and humid drafts from migrating into living areas above',
      'Warms up cold main-floor living spaces and eliminates drafty baseboards',
      'Prevents foundation freeze-thaw damage and below-grade pipe freezing',
      'Deters musty odors and damp conditions for a cleaner indoor air environment',
    ],
    applicationAreas: ['Poured Concrete Walls', 'Stone Foundations', 'Exposed Crawlspaces', 'Header Joists'],
    image: IMAGES.floorService,
    imageAlt: 'Basement foundation wall spray foam insulation in an Ontario home',
  },
];

export const WHY_SPRAY_FOAM_PILLARS: BenefitPillar[] = [
  {
    id: 'pillar-air-sealing',
    index: '01',
    title: 'Superior Air Sealing',
    subtitle: 'Stops Invisible Air Leakage',
    description:
      'Unlike traditional batt insulation that air can filter through, spray foam expands up to 30–60 times its liquid volume to seal micro-cracks, electrical penetrations, and framing gaps.',
    scienceNote:
      'According to building science data, uncontrolled air leakage can account for up to 40% of heating and cooling energy loss.',
  },
  {
    id: 'pillar-winter-warmth',
    index: '02',
    title: 'Warm in Winter, Cool in Summer',
    subtitle: 'Year-Round Indoor Temperature Stability',
    description:
      'Engineered to withstand Ontario’s extreme seasonal climate swings—from -30°C winter cold snaps in North Bay to humid 32°C summer days in Barrie and Muskoka.',
    scienceNote:
      'Closed-cell spray foam maintains its thermal R-value even in sub-zero winter winds without compression or settling.',
  },
  {
    id: 'pillar-bill-stability',
    index: '03',
    title: 'Steadier Energy Bills',
    subtitle: 'No More Roller Coaster Utility Bills',
    description:
      'Your energy bill shouldn’t feel like it’s at Canada’s Wonderland. By creating a continuous thermal barrier, your heating and cooling systems operate with predictable, steady efficiency.',
    scienceNote:
      'A tight thermal envelope dramatically lowers HVAC runtimes during peak winter heating and peak summer cooling periods.',
  },
  {
    id: 'pillar-moisture-barrier',
    index: '04',
    title: 'Moisture & Vapor Defense',
    subtitle: 'Crucial for Ontario Lake Country',
    description:
      'Closed-cell spray foam acts as a certified vapor barrier in a single application, protecting wall assemblies and cottage framing against humid air infiltration and condensation.',
    scienceNote:
      'Resists water absorption and creates an impermeable seal against damp lakeside and river valley humidity.',
  },
  {
    id: 'pillar-ice-dam-protection',
    index: '05',
    title: 'Attic Ice Dam Mitigation',
    subtitle: 'Protect Your Roof & Eaves',
    description:
      'In cold climates, warm indoor air leaking into attics melts roof snow, creating heavy ice dams. Proper attic and rafter spray foam insulation keeps the roof deck cold and prevents roof damage.',
    scienceNote:
      'Eliminates warm convective air currents from entering the attic cavity, keeping snow melts uniform.',
  },
  {
    id: 'pillar-longevity',
    index: '06',
    title: 'Permanent Durability',
    subtitle: 'Will Not Sag, Settle, or Degrade',
    description:
      'Spray foam adheres securely to wood framing, concrete, and metal surfaces, remaining structurally sound for decades without sagging, shifting, or creating pest pathways.',
    scienceNote:
      'Forms a rigid, long-term bond that adds structural integrity to wall assemblies and roof decks.',
  },
];

export const ONTARIO_PROPERTY_PILLARS: OntarioPropertyPillar[] = [
  {
    id: 'ont-winter',
    title: 'Severe Ontario Sub-Zero Winters',
    badge: 'Winter Defense',
    challenge:
      'Temperatures dropping below -25°C in Barrie, Muskoka, and North Bay create intense temperature differentials, forcing heating systems to run non-stop and generating massive draft currents.',
    solution:
      'Dr. Foam applies high-density closed-cell spray foam to rim joists, exterior walls, and roof decks to eliminate drafts and retain radiant heat indoors.',
    highlight: 'Keep heated air inside and stop heating bills from skyrocketing during deep winter freezes.',
  },
  {
    id: 'ont-cottages',
    title: 'Waterfront Cottages & Four-Season Conversions',
    badge: 'Cottage Country',
    challenge:
      'Many Muskoka, Parry Sound, and Lake Nipissing properties were built as seasonal retreats with crawlspaces, exposed joists, and minimal insulation that freeze rapidly.',
    solution:
      'We insulate crawlspace foundations, cathedral ceilings, and unheated floors so cottage owners can enjoy comfortable four-season living without frozen pipes.',
    highlight: 'Convert seasonal cabins into cozy, energy-efficient four-season retreats with year-round peace of mind.',
  },
  {
    id: 'ont-ice-dams',
    title: 'Attic Heat Escape & Heavy Ice Damming',
    badge: 'Roof Protection',
    challenge:
      'Warm air escaping through attic bypasses melts heavy snowpack on roofs, which refreezes at the cold eaves, forming dangerous ice dams and costly water leaks.',
    solution:
      'Air-sealing and spray foaming the attic floor or hot-roof deck seals air leaks, keeping the roof deck at exterior temperature and preventing ice buildup.',
    highlight: 'Prevent water backup into ceilings, rot, and expensive roof repairs during heavy Ontario snowfalls.',
  },
  {
    id: 'ont-summer',
    title: 'Humid Ontario Summer Heat Loads',
    badge: 'Summer Comfort',
    challenge:
      'July and August bring high humidity and hot sun that turns second-floor bedrooms and attics into thermal ovens, overburdening air conditioning units.',
    solution:
      'Spray foam blocks radiant heat transfer and humid outdoor air infiltration, allowing AC systems to keep the entire home evenly cool with less runtime.',
    highlight: 'Maintain comfortable second floors and consistent room-to-room temperatures all summer long.',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Free Initial Consultation',
    subtitle: 'Call 705-733-1163 or Request Online',
    description:
      'Contact Dr. Foam via phone or our quick estimate form. We discuss your property type, current draft or heating concerns, and project goals across our Barrie-to-North Bay service corridor.',
    deliverable: 'Prompt consultation & project scope evaluation',
  },
  {
    number: '02',
    title: 'Thermal Assessment & Prescription',
    subtitle: 'Tailored Solution for Your Structure',
    description:
      'We evaluate your attic, walls, crawlspace, or construction blueprints to determine the ideal foam density (closed-cell vs open-cell), required R-value, and key air-sealing priority zones.',
    deliverable: 'Transparent, detailed estimate with clear scope',
  },
  {
    number: '03',
    title: 'Precision Application',
    subtitle: 'Clean, Safe & Certified Installation',
    description:
      'Our trained technicians protect your property, prep the application surface, and spray with calibrated equipment for a uniform, high-adhesion thermal and air barrier.',
    deliverable: 'Airtight, seamless building envelope protection',
  },
  {
    number: '04',
    title: 'Final Quality Check & Cleanup',
    subtitle: 'Warm in Winter, Cool in Summer',
    description:
      'We inspect the entire application thickness, ensure all framing cavities are properly filled and trimmed where needed, and leave the workspace clean and ready for drywall or occupancy.',
    deliverable: 'Verified coverage & lasting comfort reassurance',
  },
];

export const TRUST_PILLARS: TrustItem[] = [
  {
    title: 'Clear & Honest Communication',
    description:
      'No confusing jargon or aggressive sales tactics. Dr. Foam provides transparent recommendations tailored specifically to your building envelope and budget.',
    tag: 'Transparent Service',
  },
  {
    title: 'Regional Ontario Climate Expertise',
    description:
      'From the shores of Lake Simcoe in Barrie to the rugged shield of North Bay and Muskoka, we understand the specific challenges of Central Ontario weather.',
    tag: 'Barrie to North Bay',
  },
  {
    title: 'Quality-Focused Equipment & Materials',
    description:
      'We use top-tier spray foam formulations engineered for Canadian climates, applied with professional high-pressure proportioners for consistent density and maximum adhesion.',
    tag: 'Premium Formulations',
  },
  {
    title: 'Residential & Commercial Versatility',
    description:
      'Whether insulating a custom lakefront cottage, an existing family home, an auto repair shop, or a new commercial development, Dr. Foam has the equipment and expertise to execute.',
    tag: 'Full-Scope Capability',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-what-is',
    category: 'Basics',
    question: 'What is spray foam insulation and how does it work?',
    answer:
      'Spray foam insulation is a modern insulation material that is applied as a liquid and expands rapidly within seconds to fill every crack, crevice, and framing cavity. As it expands and cures, it creates an airtight thermal and moisture barrier that stops air infiltration far more effectively than traditional fiberglass batt insulation.',
  },
  {
    id: 'faq-service-area',
    category: 'Service Area',
    question: 'What areas does Dr Foam Insulation Ltd. service?',
    answer:
      'Dr Foam Insulation proudly services properties across Ontario from Barrie to North Bay. This includes Barrie, Innisfil, Orillia, Midland, Gravenhurst, Bracebridge, Huntsville, Lake of Bays, Muskoka, Parry Sound, Sundridge, Burk’s Falls, North Bay, Callander, and surrounding cottage country communities.',
  },
  {
    id: 'faq-closed-open',
    category: 'Science',
    question: 'What is the difference between closed-cell and open-cell spray foam?',
    answer:
      'Closed-cell spray foam is a dense, rigid foam with high R-value (typically ~R-6 to R-7 per inch) that acts as an air barrier, moisture vapor barrier, and adds structural strength. It is ideal for exterior walls, crawlspaces, cathedral roofs, and metal buildings. Open-cell foam is lighter, highly flexible, and excellent for interior sound deadening and dry attic flat applications.',
  },
  {
    id: 'faq-ice-dams',
    category: 'Ontario Winters',
    question: 'Can spray foam insulation help prevent roof ice dams in winter?',
    answer:
      'Yes! Ice dams occur when warm air leaks from the living areas into the attic, warming the roof deck and melting snow from below, which then refreezes at the cold eaves. Spray foaming the attic floor or roof rafters seals air leaks and keeps the roof deck cool, effectively mitigating the root cause of ice damming.',
  },
  {
    id: 'faq-cottage-four-season',
    category: 'Cottages',
    question: 'Can Dr. Foam help convert our three-season cottage into a four-season home?',
    answer:
      'Absolutely. One of our specialties is four-season cottage retrofits. Spray foaming the crawlspace, rim joists, exterior walls, and roof decks provides the necessary thermal barrier and air seal to keep plumbing pipes from freezing and allow easy, cost-effective heating during Ontario winters.',
  },
  {
    id: 'faq-estimate-process',
    category: 'Estimates',
    question: 'How do I request a free estimate from Dr. Foam?',
    answer:
      'You can call us directly at 705-733-1163, email sales.drfoam@gmail.com, or fill out the free estimate form right here on drfoam.ca. We’ll discuss your project requirements and provide a clear, prompt quote.',
  },
  {
    id: 'faq-residential-commercial',
    category: 'Scope',
    question: 'Do you handle both residential and commercial projects?',
    answer:
      'Yes, Dr Foam Insulation Ltd. handles residential homes, cottages, and additions, as well as commercial warehouses, agricultural barns, workshops, and new construction developments across Central Ontario.',
  },
];
