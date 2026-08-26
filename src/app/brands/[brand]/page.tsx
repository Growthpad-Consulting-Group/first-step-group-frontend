import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BRANDS, getBrandBySlug } from '@/data/brands';
import { getProducts } from '@/lib/products';
import { SITE_URL } from '@/lib/site';
import BrandHero from '@/features/brands/components/BrandHero';
import BrandStory from '@/features/brands/components/BrandStory';
import BrandCollectionGallery from '@/features/brands/components/BrandCollectionGallery';
import RelatedBrands from '@/features/brands/components/RelatedBrands';

interface Props {
  params: Promise<{ brand: string }>;
}

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return { title: 'Brand not found' };

  return {
    title: brand.name,
    description: brand.description,
    alternates: { canonical: `${SITE_URL}/brands/${brand.slug}` },
  };
}

export default async function BrandPage({ params }: Props) {
  const { brand: slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  // Brand is a local (non-global) Woo attribute, so it isn't filterable via Woo's REST
  // API — same tradeoff as the department page's brand filter (see lib/woo/README.md).
  const result = await getProducts({ limit: 60 }).catch(() => null);
  const products = (result?.items ?? []).filter(
    (p) => p.brand?.toLowerCase() === brand.name.toLowerCase(),
  );

  const relatedBrands = BRANDS.filter((b) => b.slug !== brand.slug).slice(0, 3);

  return (
    <div className="flex flex-col">
      <BrandHero brand={brand} />
      <BrandStory brand={brand} />
      <BrandCollectionGallery brand={brand} products={products} />
      <RelatedBrands brands={relatedBrands} />
    </div>
  );
}
