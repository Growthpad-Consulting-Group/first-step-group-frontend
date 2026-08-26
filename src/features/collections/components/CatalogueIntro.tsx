import Link from 'next/link';
import { Icon } from '@iconify/react';
import type { Department } from '@/data/departments';

export default function CatalogueIntro({ department }: { department: Department }) {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          {department.title} Collection
        </p>
        <h2 className="font-display mt-3 text-2xl font-light uppercase tracking-tight text-ink sm:text-3xl">
          Designed around daily rituals
        </h2>
      </div>
      <div className="max-w-xl">
        <p className="text-lg leading-relaxed text-slate">{department.description}</p>
        <Link
          href="/collections"
          className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate transition-colors hover:text-gold-dark"
        >
          View Collections
          <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
