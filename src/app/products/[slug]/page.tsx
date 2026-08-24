import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import ProductDetail from '@/components/ProductDetail';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (!product) notFound();

  return <ProductDetail product={product} />;
}
