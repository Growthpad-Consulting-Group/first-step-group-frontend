export interface Brand {
  slug: string;
  name: string;
  tagline: string;
}

/**
 * The 9 brands First Step carries (spec §7.3). Logo assets are NOT yet
 * client-approved (Asana: "Export brand assets, favicon, OG + approved
 * brand logos (9)" is still in Backlog) — render as text lockups until
 * real logo files land.
 */
export const BRANDS: Brand[] = [
  { slug: 'victoria-albert', name: 'Victoria + Albert', tagline: 'Sculptural Baths & Basins' },
  { slug: 'kohler', name: 'Kohler', tagline: 'Bathroom Design & Innovation' },
  { slug: 'grohe', name: 'Grohe', tagline: 'Precision Water Technology' },
  { slug: 'hansgrohe', name: 'hansgrohe', tagline: 'Engineered Water Experiences' },
  { slug: 'franke', name: 'Franke', tagline: 'Kitchen Systems & Sinks' },
  { slug: 'smeg', name: 'Smeg', tagline: 'Iconic Italian Appliances' },
  { slug: 'cosentino', name: 'Cosentino', tagline: 'Surfaces & Countertops' },
  { slug: 'dadoquartz', name: 'Dadoquartz', tagline: 'Engineered Quartz Surfaces' },
  { slug: 'meir', name: 'Meir', tagline: 'Tapware & Bathroomware' },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}
