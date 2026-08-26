import Link from 'next/link';
import type { Brand } from '@/data/brands';

export default function BrandPortfolioGrid({ brands }: { brands: Brand[] }) {
  return (
    <section className="bg-slate">
      <div className="container-fluid py-20 sm:py-28">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              The Global Portfolio
            </h4>
            <h3 className="font-display mt-3 max-w-2xl text-2xl font-light uppercase tracking-tight text-cream sm:text-3xl">
              Distinct expertise. One considered destination.
            </h3>
          </div>
          <p className="max-w-md text-base leading-relaxed text-cream-dark">
            From precision brassware and intelligent showers to complete kitchen systems,
            appliances and architectural surfaces.
          </p>
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
              <div className="flex flex-1 flex-col gap-2 p-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                  {brand.tagline}
                </span>
                <p className="text-sm leading-relaxed text-ink-light">{brand.description}</p>
                <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate">
                  Explore Brand →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
