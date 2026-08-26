export interface NavLink {
  href: string;
  label: string;
  hasDropdown?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  { href: '/collections', label: 'Collections', hasDropdown: true },
  { href: '/brands', label: 'Brands', hasDropdown: true },
  { href: '/shop', label: 'Shop' },
  { href: '/showroom', label: 'Showroom' },
  { href: '/journal', label: 'Journal' },
];
