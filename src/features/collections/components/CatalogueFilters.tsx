'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Department } from '@/data/departments';
import { BRANDS } from '@/data/brands';

interface CatalogueFiltersProps {
  department: Department;
  activeSub?: string;
}

export default function CatalogueFilters({ department, activeSub }: CatalogueFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeBrand = searchParams.get('brand') ?? '';

  const brandOptions = BRANDS.filter((b) => department.brandSlugs.includes(b.slug));

  function buildHref(sub?: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (sub) params.set('sub', sub);
    else params.delete('sub');
    const qs = params.toString();
    return `/collections/${department.slug}${qs ? `?${qs}` : ''}`;
  }

  function onBrandChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set('brand', value);
    else params.delete('brand');
    const qs = params.toString();
    router.push(`/collections/${department.slug}${qs ? `?${qs}` : ''}`);
  }

  return (
    <div className="flex flex-col gap-4 rounded-md border border-cream-dark bg-white p-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-ink-light">
      <nav className="flex flex-wrap items-center gap-6 text-xs font-semibold uppercase tracking-widest">
        <Link
          href={buildHref(undefined)}
          className={!activeSub ? 'text-gold' : 'text-slate transition-colors hover:text-gold-dark'}
        >
          All
        </Link>
        {department.subcategories.map((sub) => (
          <Link
            key={sub.slug}
            href={buildHref(sub.slug)}
            className={
              activeSub === sub.slug
                ? 'text-gold'
                : 'text-slate transition-colors hover:text-gold-dark'
            }
          >
            {sub.label}
          </Link>
        ))}
      </nav>

      {brandOptions.length > 0 && (
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate">
          <span className="sr-only">Filter by brand</span>
          <select
            value={activeBrand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="rounded-xs border border-cream-dark bg-transparent py-1.5 pl-2 pr-6 text-xs font-semibold uppercase tracking-widest text-slate outline-none dark:border-white/20"
          >
            <option value="">All Brands</option>
            {brandOptions.map((brand) => (
              <option key={brand.slug} value={brand.slug}>
                {brand.name}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
}
