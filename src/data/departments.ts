export interface Department {
  slug: string;
  /** Matches the Woo category name used to derive Product.department in lib/woo/products.ts. */
  name: string;
  title: string;
  description: string;
  /** Longer editorial line for the department PLP hero. */
  heroDescription: string;
  brands: string;
  /** Brand slugs carried in this department, from data/brands.ts. */
  brandSlugs: string[];
  /** Sub-category filter chips, per build spec §7.3. Slugs match Woo child-category slugs. */
  subcategories: { slug: string; label: string }[];
  image: string;
}

export const DEPARTMENTS: Department[] = [
  {
    slug: 'bathroom',
    name: 'Bathroom & Wet Rooms',
    title: 'Bathroom',
    description:
      'Sculptural baths, intelligent brassware and refined fittings selected for exceptional daily rituals.',
    heroDescription:
      'Freestanding baths, precision showers, basin mixers and accessories sourced from the world’s most respected brands.',
    brands: 'Victoria + Albert · Grohe · Kohler · Hansgrohe',
    brandSlugs: ['victoria-albert', 'grohe', 'kohler', 'hansgrohe'],
    subcategories: [
      { slug: 'bathroom-baths', label: 'Baths' },
      { slug: 'bathroom-basins', label: 'Basins' },
      { slug: 'bathroom-showers', label: 'Showers' },
      { slug: 'bathroom-taps-mixers', label: 'Taps & Mixers' },
      { slug: 'bathroom-accessories', label: 'Accessories' },
    ],
    image: '/images/bathroom.jpg',
  },
  {
    slug: 'kitchen',
    name: 'Kitchen & Surfaces',
    title: 'Kitchen',
    description:
      'Statement kitchens, sinks, taps, surfaces and appliances chosen for enduring performance.',
    heroDescription:
      'Sinks, taps, work surfaces and appliances selected for design integrity and everyday performance.',
    brands: 'Smeg · Franke · Cosentino · Grohe',
    brandSlugs: ['smeg', 'franke', 'cosentino', 'grohe'],
    subcategories: [
      { slug: 'kitchen-sinks', label: 'Sinks' },
      { slug: 'kitchen-taps', label: 'Taps' },
      { slug: 'kitchen-work-surfaces', label: 'Work Surfaces' },
      { slug: 'kitchen-appliances', label: 'Appliances' },
      { slug: 'kitchen-accessories', label: 'Accessories' },
    ],
    image: '/images/kitchen.jpg',
  },
  {
    slug: 'hvac',
    name: 'Climate Control',
    title: 'Climate Control',
    description:
      'Quiet, efficient heating and cooling systems designed around clean air, comfort and discreet integration.',
    heroDescription:
      'Cooling, heating, air-quality and control systems designed around comfort and discreet integration.',
    brands: 'Tailored Systems · Efficient Performance · Expert Support',
    brandSlugs: [],
    subcategories: [
      { slug: 'hvac-cooling', label: 'Cooling' },
      { slug: 'hvac-heating', label: 'Heating' },
      { slug: 'hvac-air-quality', label: 'Air Quality' },
      { slug: 'hvac-controls', label: 'Controls' },
      { slug: 'hvac-accessories', label: 'Accessories' },
    ],
    image: '/images/hvac.jpg',
  },
  {
    slug: 'home-tech',
    name: 'Home Technology',
    title: 'Home Technology',
    description:
      'Integrated lighting, control and connected-home solutions that simplify the way your spaces respond and perform.',
    heroDescription:
      'Lighting, connected control and seamless integration for spaces that respond and perform intuitively.',
    brands: 'Lighting · Connected Control · Seamless Integration',
    brandSlugs: [],
    subcategories: [
      { slug: 'home-tech-lighting', label: 'Lighting' },
      { slug: 'home-tech-connected-control', label: 'Connected Control' },
      { slug: 'home-tech-security', label: 'Security' },
      { slug: 'home-tech-accessories', label: 'Accessories' },
    ],
    image: '/images/hero-bg.jpg',
  },
];

export function getDepartmentBySlug(slug: string): Department | undefined {
  return DEPARTMENTS.find((d) => d.slug === slug);
}
