import Link from 'next/link';
import type { Brand } from '@/data/brands';

export default function RelatedBrands({ brands }: { brands: Brand[] }) {
  if (brands.length === 0) return null;

  return (
    <section className="bg-slate">
      <div className="container-fluid py-20 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
          Related Brands
        </p>
        <h3 className="font-display mt-3 max-w-xl text-2xl font-light uppercase tracking-tight text-cream sm:text-3xl">
          Continue exploring
        </h3>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="group flex flex-col overflow-hidden rounded-md bg-cream transition-colors hover:bg-white"
            >
              <div className="flex h-28 items-center justify-center border-b border-cream-dark px-6">
                <span className="font-display text-xl font-light uppercase tracking-tight text-ink">
                  {brand.name}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                  {brand.tagline}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-slate">
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
