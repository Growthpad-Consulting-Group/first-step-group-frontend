import type { Metadata } from 'next';
import { getProducts } from '@/lib/products';
import ProductCard from '@/features/products/components/ProductCard';
import { SITE_URL } from '@/lib/site';

type SortOption = 'price_asc' | 'price_desc' | 'newest';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse the full collection of curated essentials.',
  alternates: { canonical: `${SITE_URL}/products` },
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; sort?: string; category?: string }>;
}) {
  const params = await searchParams;
  const sort = (['price_asc', 'price_desc', 'newest'] as SortOption[]).includes(
    params.sort as SortOption,
  )
    ? (params.sort as SortOption)
    : undefined;

  const result = await getProducts({
    search: params.search,
    category: params.category,
    sort,
    limit: 24,
  }).catch(() => null);

  return (
    <div className="container-fluid py-16">
      <h1 className="font-display mb-10 text-3xl font-semibold tracking-tight">Shop</h1>

      {!result || result.items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-black/10 p-12 text-center text-sm text-ink-light dark:border-white/10">
          No products found.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {result.items.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
