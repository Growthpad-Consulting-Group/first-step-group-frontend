import Link from 'next/link';
import { getProducts } from '@/lib/products';
import ProductCard from '@/features/products/components/ProductCard';
import Hero from '@/features/home/components/Hero';
import Collections from '@/features/home/components/Collections';
import Difference from '@/features/home/components/Difference';
import Brands from '@/features/home/components/Brands';
import Showroom from '@/features/home/components/Showroom';
import Insights from '@/features/home/components/Insights';

export default async function Home() {
  const featured = await getProducts({ limit: 8, sort: 'newest' }).catch(() => null);

  return (
    <div className="flex flex-col">
      <Hero />
      <Collections />
      <Difference />
      <Brands />
      <Showroom />
      <Insights />

      <section className="container-fluid py-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold tracking-tight">New Arrivals</h2>
          <Link href="/products" className="text-sm font-medium text-slate hover:text-gold dark:text-cream-dark dark:hover:text-gold-light">
            View all →
          </Link>
        </div>

        {!featured || featured.items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-black/10 p-12 text-center text-sm text-ink-light dark:border-white/10">
            No products yet.
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
