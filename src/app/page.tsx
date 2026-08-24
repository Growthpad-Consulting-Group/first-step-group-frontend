import Link from 'next/link';
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Hero from '@/components/Hero';

export default async function Home() {
  const featured = await getProducts({ limit: 8, sort: 'newest' }).catch(() => null);

  return (
    <div className="flex flex-col">
      <Hero />

      <section className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">New Arrivals</h2>
          <Link href="/products" className="text-sm font-medium text-zinc-500 hover:text-black dark:hover:text-white">
            View all →
          </Link>
        </div>

        {!featured || featured.items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-black/10 p-12 text-center text-sm text-zinc-500 dark:border-white/10">
            No products yet. Connect the backend and add some products to see them here.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {featured.items.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
