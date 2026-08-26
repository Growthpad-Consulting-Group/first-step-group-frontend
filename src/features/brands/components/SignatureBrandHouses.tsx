import Image from 'next/image';
import Link from 'next/link';
import type { Brand } from '@/data/brands';

export default function SignatureBrandHouses({ brands }: { brands: Brand[] }) {
  return (
    <section id="signature-houses" className="bg-cream">
      <div className="container-fluid py-20 sm:py-28">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              Signature Brand Houses
            </h4>
            <h3 className="font-display mt-3 max-w-2xl text-2xl font-light uppercase tracking-tight text-ink sm:text-3xl">
              Design histories that shape the way we live.
            </h3>
          </div>
          <p className="max-w-md text-base leading-relaxed text-ink-light">
            Begin with two defining bathroom brands—each recognised for a distinct point of
            view, lasting design integrity and exceptional material performance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="group flex flex-col overflow-hidden rounded-md bg-white"
            >
              <div className="relative aspect-16/9 w-full overflow-hidden">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-col items-start gap-3 p-8 sm:p-10">
                <span className="font-display text-3xl font-light text-ink">{brand.name}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-dark">
                  {brand.tagline}
                </span>
                <p className="max-w-lg text-base leading-relaxed text-ink-light">
                  {brand.description}
                </p>
                <span className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate">
                  Explore {brand.name} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
