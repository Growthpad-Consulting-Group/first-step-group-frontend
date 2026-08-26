import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/lib/products';
import ProductDetail from '@/features/products/components/ProductDetail';
import ProductBreadcrumb from '@/features/products/components/ProductBreadcrumb';
import ProductStorySpecs from '@/features/products/components/ProductStorySpecs';
import RelatedProducts from '@/features/products/components/RelatedProducts';
import JsonLd from '@/features/layout/components/JsonLd';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import { DEPARTMENTS } from '@/data/departments';

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
    product.description ?? `${product.purchaseMode === 'poa' ? 'Enquire about' : 'Buy'} ${product.name} at ${SITE_NAME}.`;
  const url = `${SITE_URL}/product/${product.slug}`;

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

  const url = `${SITE_URL}/product/${product.slug}`;
  const department = DEPARTMENTS.find((d) => d.name === product.department);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? undefined,
    image: product.images.length > 0 ? product.images.map((img) => img.url) : undefined,
    sku: product.reference ?? product.id,
    category: product.category,
    brand: product.brand ? { '@type': 'Brand', name: product.brand } : undefined,
    offers:
      product.purchaseMode === 'buy'
        ? {
            '@type': 'Offer',
            url,
            priceCurrency: 'USD',
            price: product.price,
            availability:
              product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
          }
        : undefined,
  };

  const breadcrumbTrail = [
    { label: 'Shop', href: '/collections' },
    ...(department ? [{ label: department.title, href: `/collections/${department.slug}` }] : []),
    { label: product.name },
  ];

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...breadcrumbTrail.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.label,
        item: crumb.href ? `${SITE_URL}${crumb.href}` : url,
      })),
    ],
  };

  return (
    <>
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <ProductBreadcrumb crumbs={breadcrumbTrail} />
      <ProductDetail product={product} />
      <ProductStorySpecs product={product} />
      <RelatedProducts ids={product.relatedProductIds} />
    </>
  );
}
