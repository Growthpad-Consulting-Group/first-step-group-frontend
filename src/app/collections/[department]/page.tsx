import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DEPARTMENTS, getDepartmentBySlug } from '@/data/departments';
import { BRANDS } from '@/data/brands';
import { getProducts } from '@/lib/products';
import { SITE_URL } from '@/lib/site';
import DepartmentHero from '@/features/collections/components/DepartmentHero';
import CatalogueIntro from '@/features/collections/components/CatalogueIntro';
import CatalogueFilters from '@/features/collections/components/CatalogueFilters';
import BrandsWeCarry from '@/features/collections/components/BrandsWeCarry';
import ProductCard from '@/features/products/components/ProductCard';

interface Props {
  params: Promise<{ department: string }>;
  searchParams: Promise<{ sub?: string; brand?: string }>;
}

export function generateStaticParams() {
  return DEPARTMENTS.map((d) => ({ department: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { department: slug } = await params;
  const department = getDepartmentBySlug(slug);
  if (!department) return { title: 'Collection not found' };

  return {
    title: department.name,
    description: department.description,
    alternates: { canonical: `${SITE_URL}/collections/${department.slug}` },
  };
}

export default async function DepartmentPage({ params, searchParams }: Props) {
  const { department: slug } = await params;
  const department = getDepartmentBySlug(slug);
  if (!department) notFound();

  const { sub, brand } = await searchParams;
  const category = sub ?? department.slug;

  const result = await getProducts({ category, limit: 60 }).catch(() => null);
  const brandFilter = brand ? BRANDS.find((b) => b.slug === brand) : undefined;
  const items = brandFilter
    ? (result?.items ?? []).filter(
        (p) => p.brand?.toLowerCase() === brandFilter.name.toLowerCase(),
      )
    : (result?.items ?? []);

  const [featured, ...rest] = items;
  const brandsCarried = BRANDS.filter((b) => department.brandSlugs.includes(b.slug));

  return (
    <div className="flex flex-col">
      <DepartmentHero department={department} />

      <section id="catalogue" className="bg-cream">
        <div className="container-fluid flex flex-col gap-12 py-20 sm:py-28">
          <CatalogueIntro department={department} />
          <CatalogueFilters department={department} activeSub={sub} />

          {items.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-black/10 p-12 text-center text-sm text-ink-light dark:border-white/10">
              No products found in this collection yet.
            </p>
          ) : (
            <div className="flex flex-col gap-6">
              {featured && (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <ProductCard product={featured} featured />
                </div>
              )}
              {rest.length > 0 && (
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
                  {rest.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <BrandsWeCarry brands={brandsCarried} />
    </div>
  );
}
