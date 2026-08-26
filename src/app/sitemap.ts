import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { getProducts } from '@/lib/products';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const limit = 100;
  const first = await getProducts({ limit, page: 1 }).catch(() => null);
  if (!first) return staticRoutes;

  const remainingPages = Array.from(
    { length: Math.max(0, first.totalPages - 1) },
    (_, i) => i + 2,
  );
  const rest = await Promise.all(
    remainingPages.map((page) => getProducts({ limit, page }).catch(() => null)),
  );

  const allProducts = [first, ...rest]
    .filter((page): page is NonNullable<typeof page> => page !== null)
    .flatMap((page) => page.items);

  const productRoutes: MetadataRoute.Sitemap = allProducts.map((product) => ({
    url: `${SITE_URL}/product/${product.slug}`,
    lastModified: product.updatedAt ? new Date(product.updatedAt) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
    images: product.images.length > 0 ? product.images.map((img) => img.url) : undefined,
  }));

  return [...staticRoutes, ...productRoutes];
}
