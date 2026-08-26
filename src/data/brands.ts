export interface BrandFeature {
  title: string;
  description: string;
}

export interface Brand {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  /** Victoria + Albert and Kohler get the larger "Signature Brand Houses" treatment (frame 08). */
  signature?: boolean;
  image: string;
  /** Longer editorial heading + numbered features for the brand story section (frame 04/05).
   *  Only populated where real per-brand copy exists in Figma — not fabricated for the rest. */
  storyHeading?: string;
  storyDescription?: string;
  features?: BrandFeature[];
}

/**
 * The 9 brands First Step carries (spec §7.3). Logo assets are NOT yet
 * client-approved (Asana: "Export brand assets, favicon, OG + approved
 * brand logos (9)" is still in Backlog) — render as text lockups until
 * real logo files land. Images reuse the department lifestyle photography
 * already in the project (no per-brand photography exists yet either).
 */
export const BRANDS: Brand[] = [
  {
    slug: 'victoria-albert',
    name: 'Victoria + Albert',
    tagline: 'Baths & Basins',
    description:
      'Sculptural freestanding baths and basins, hand-finished in England with architectural lightness and enduring presence.',
    signature: true,
    image: '/images/bathroom.jpg',
    storyHeading: 'Sculpted from stone. Built to last.',
    storyDescription:
      'Victoria + Albert creates sculptural baths and basins from QUARRYCAST®, a proprietary volcanic limestone composite, then hand-finishes every piece in England.',
    features: [
      {
        title: 'QUARRYCAST® Material',
        description: 'Volcanic limestone composite with strength and natural warmth.',
      },
      {
        title: '35+ Colours',
        description: 'A considered palette with custom RAL finishes available.',
      },
      {
        title: 'Hand-Finished in England',
        description: 'Modern and Victorian forms refined by skilled hands.',
      },
    ],
  },
  {
    slug: 'kohler',
    name: 'Kohler',
    tagline: 'Bathroom Innovation',
    description:
      'Bathroom collections shaped by more than a century of design, engineered performance and considered technological innovation.',
    signature: true,
    image: '/images/bathroom.jpg',
  },
  {
    slug: 'grohe',
    name: 'Grohe',
    tagline: 'Water Systems',
    description:
      'Precision taps, showers and water systems engineered for contemporary performance.',
    image: '/images/bathroom.jpg',
  },
  {
    slug: 'hansgrohe',
    name: 'hansgrohe',
    tagline: 'Shower Experience',
    description:
      'Bathroom and shower experiences shaped by innovation, comfort and thoughtful detail.',
    image: '/images/bathroom.jpg',
  },
  {
    slug: 'franke',
    name: 'Franke',
    tagline: 'Kitchen Systems',
    description:
      'Sinks, taps and practical kitchen innovations designed for complete workspaces.',
    image: '/images/kitchen.jpg',
  },
  {
    slug: 'smeg',
    name: 'Smeg',
    tagline: 'Italian Appliances',
    description:
      'Distinctive appliances combining expressive Italian design and considered technology.',
    image: '/images/kitchen.jpg',
  },
  {
    slug: 'cosentino',
    name: 'Cosentino',
    tagline: 'Architectural Surfaces',
    description:
      'Advanced surfaces defined by durability, continuity and strong material character.',
    image: '/images/kitchen.jpg',
  },
  {
    slug: 'dadoquartz',
    name: 'DADOquartz',
    tagline: 'Quartz Bathware',
    description:
      'Solid quartz-composite baths and basins with sculptural form and a natural satin character.',
    image: '/images/bathroom.jpg',
  },
  {
    slug: 'meir',
    name: 'Meir',
    tagline: 'Architectural Tapware',
    description:
      'Tapware, showers and accessories distinguished by refined finishes and clean architectural geometry.',
    image: '/images/bathroom.jpg',
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}
