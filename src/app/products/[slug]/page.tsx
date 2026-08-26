import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import ProductDetail from '@/features/products/components/ProductDetail';
import JsonLd from '@/features/layout/components/JsonLd';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { Category } from '@/lib/types';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (!product) {
    return { title: 'Product not found' };
  }

  const description =
    product.description ?? `Buy ${product.name} at ${SITE_NAME}.`;
  const url = `${SITE_URL}/products/${product.slug}`;

  return {
    title: product.name,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: product.name,
      description,
      url,
      images: product.images.length > 0 ? product.images : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description,
      images: product.images.length > 0 ? product.images : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug).catch(() => null);

  if (!product) notFound();

  const category = typeof product.category === 'object' ? (product.category as Category) : null;
  const url = `${SITE_URL}/products/${product.slug}`;

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? undefined,
    image: product.images.length > 0 ? product.images : undefined,
    sku: product._id,
    category: category?.name,
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'USD',
      price: product.price,
      availability:
        product.stock > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_URL}/products` },
      { '@type': 'ListItem', position: 3, name: product.name, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ProductDetail product={product} />
    </>
  );
}
