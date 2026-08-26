import { getProductsByIds } from '@/lib/products';
import ProductCard from './ProductCard';

export default async function RelatedProducts({ ids }: { ids: string[] }) {
  if (ids.length === 0) return null;

  const products = await getProductsByIds(ids).catch(() => []);
  if (products.length === 0) return null;

  return (
    <section className="bg-cream">
      <div className="container-fluid py-20 sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-dark">
          Related Products
        </p>
        <h2 className="font-display mt-3 max-w-xl text-2xl font-light uppercase tracking-tight text-ink sm:text-3xl">
          Complete the space.
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
