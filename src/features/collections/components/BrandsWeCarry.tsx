import Link from 'next/link';
import { Icon } from '@iconify/react';
import type { Brand } from '@/data/brands';

export default function BrandsWeCarry({ brands }: { brands: Brand[] }) {
  if (brands.length === 0) return null;

  return (
    <section className="bg-slate">
      <div className="container-fluid py-20 sm:py-28">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Brands We Carry
            </p>
            <h3 className="font-display mt-3 text-2xl font-light uppercase tracking-tight text-cream sm:text-3xl">
              Trusted names. Exceptional craft.
            </h3>
          </div>
          <div className="max-w-md">
            <p className="text-base leading-relaxed text-cream-dark">
              A focused selection of international makers known for design integrity,
              engineering and enduring quality.
            </p>
            <Link
              href="/brands"
              className="mt-4 inline-flex items-center gap-2 rounded-xs bg-gold px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
            >
              View All Brands
              <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="group flex flex-col overflow-hidden rounded-md bg-cream transition-colors hover:bg-white"
            >
              <div className="flex h-32 items-center justify-center border-b border-cream-dark px-6">
                <span className="font-display text-2xl font-light uppercase tracking-tight text-ink">
                  {brand.name}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                  {brand.tagline}
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate">
                  Explore Brand
                  <Icon
                    icon="solar:arrow-right-linear"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
