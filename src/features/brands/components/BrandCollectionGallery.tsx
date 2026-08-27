import type { Brand } from '@/data/brands';
import type { Product } from '@/lib/types';
import BrandProductCard from './BrandProductCard';

export default function BrandCollectionGallery({
  brand,
  products,
}: {
  brand: Brand;
  products: Product[];
}) {
  return (
    <section id="collection" className="bg-white dark:bg-ink">
      <div className="container-fluid py-20 sm:py-28">
        <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
              {brand.name} Collection
            </p>
            <h3 className="font-display mt-3 max-w-xl text-2xl font-light uppercase tracking-tight text-ink sm:text-3xl">
              {brand.galleryHeading ?? 'Selected for First Step'}
            </h3>
          </div>
          <div className="max-w-md">
            <p className="text-base leading-relaxed text-ink-light">
              {brand.galleryDescription ??
                `Explore the ${brand.name} pieces chosen for their design integrity and everyday performance.`}
            </p>
            {brand.galleryHeading && (
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-gold-dark">
                Selected for First Step
              </p>
            )}
          </div>
        </div>

        {products.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-black/10 p-12 text-center text-sm text-ink-light dark:border-white/10">
            No {brand.name} products in the catalogue yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <BrandProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
