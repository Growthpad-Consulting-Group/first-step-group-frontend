import { wooFetch, wooFetchList } from './client';
import type { Category, Product, ProductListResponse, PurchaseMode } from '@/lib/types';

interface WooImage {
  src: string;
  alt: string;
}

interface WooAttribute {
  id: number;
  name: string;
  options: string[];
}

interface WooCategoryRef {
  id: number;
  name: string;
  slug: string;
}

interface WooMetaEntry {
  key: string;
  value: unknown;
}

interface WooProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description: string;
  short_description: string;
  images: WooImage[];
  categories: WooCategoryRef[];
  attributes: WooAttribute[];
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: 'instock' | 'outofstock' | 'onbackorder';
  stock_quantity: number | null;
  meta_data: WooMetaEntry[];
  related_ids: number[];
  date_modified: string;
}

interface WooCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  image: { src: string } | null;
}

/**
 * First Step's four storefront departments. A product's `department` is read off
 * whichever of its Woo categories matches one of these names — see lib/woo/README.md
 * for how to configure this in WP Admin.
 */
const DEPARTMENTS = [
  'Bathroom & Wet Rooms',
  'Kitchen & Surfaces',
  'Climate Control',
  'Home Technology',
];

function findAttributeOptions(product: WooProduct, name: string): string[] {
  return product.attributes?.find((a) => a.name.toLowerCase() === name.toLowerCase())?.options ?? [];
}

function findMetaValue(product: WooProduct, key: string): string | undefined {
  const entry = product.meta_data?.find((m) => m.key === key);
  return typeof entry?.value === 'string' && entry.value ? entry.value : undefined;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}

function mapProduct(wc: WooProduct): Product {
  // §7.1: every product is buy or poa — driven by a "Purchase Mode" attribute in Woo.
  const purchaseModeOption = findAttributeOptions(wc, 'Purchase Mode')[0]?.toLowerCase();
  const purchaseMode: PurchaseMode = purchaseModeOption === 'poa' ? 'poa' : 'buy';

  const department = wc.categories.find((c) => DEPARTMENTS.includes(c.name))?.name;
  const category = wc.categories[0]?.name ?? 'Uncategorized';
  const brand = findAttributeOptions(wc, 'Brand')[0];
  const finishes = findAttributeOptions(wc, 'Finish');
  const installationOptions = findAttributeOptions(wc, 'Installation');

  return {
    id: String(wc.id),
    slug: wc.slug,
    name: wc.name,
    brand,
    department,
    category,
    reference: wc.sku || undefined,
    summary: wc.short_description ? stripHtml(wc.short_description) : undefined,
    description: wc.description ? stripHtml(wc.description) : undefined,
    images: (wc.images ?? []).map((img) => ({ url: img.src, alt: img.alt || wc.name })),
    finishes,
    specs: [],
    specSheetUrl: findMetaValue(wc, '_spec_sheet_url'),
    installationAvailable: installationOptions.length > 0,
    purchaseMode,
    price: purchaseMode === 'buy' && wc.price ? Number(wc.price) : undefined,
    compareAtPrice:
      purchaseMode === 'buy' && wc.sale_price && wc.regular_price
        ? Number(wc.regular_price)
        : undefined,
    availability: wc.stock_status,
    stock: wc.stock_quantity ?? (wc.stock_status === 'instock' ? 1 : 0),
    relatedProductIds: (wc.related_ids ?? []).map(String),
    updatedAt: wc.date_modified,
  };
}

function mapCategory(wc: WooCategory): Category {
  return {
    id: String(wc.id),
    name: wc.name,
    slug: wc.slug,
    description: wc.description || undefined,
    image: wc.image?.src,
    parentId: wc.parent ? String(wc.parent) : undefined,
  };
}

export interface ProductQuery {
  search?: string;
  /** Category slug. */
  category?: string;
  sort?: 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  limit?: number;
}

const SORT_PARAMS: Record<NonNullable<ProductQuery['sort']>, { orderby: string; order: string }> = {
  price_asc: { orderby: 'price', order: 'asc' },
  price_desc: { orderby: 'price', order: 'desc' },
  newest: { orderby: 'date', order: 'desc' },
};

export async function getProducts(query: ProductQuery = {}): Promise<ProductListResponse> {
  const { search, category, sort, page = 1, limit = 24 } = query;
  const sortParams = sort ? SORT_PARAMS[sort] : undefined;

  let categoryId: number | undefined;
  if (category) {
    const categories = await getCategories();
    const match = categories.find((c) => c.slug === category);
    categoryId = match ? Number(match.id) : undefined;
  }

  const { data, total, totalPages } = await wooFetchList<WooProduct[]>('/products', {
    searchParams: {
      search,
      category: categoryId,
      orderby: sortParams?.orderby,
      order: sortParams?.order,
      page,
      per_page: limit,
      status: 'publish',
    },
  });

  return {
    items: data.map(mapProduct),
    total,
    page,
    limit,
    totalPages,
  };
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const matches = await wooFetch<WooProduct[]>('/products', {
    searchParams: { slug },
  });
  const product = matches[0];
  if (!product) throw new Error(`Product not found: ${slug}`);
  return mapProduct(product);
}

/** Batch fetch by Woo product id — used for related products / bundle bars. */
export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  const data = await wooFetch<WooProduct[]>('/products', {
    searchParams: { include: ids.join(','), per_page: ids.length },
  });
  return data.map(mapProduct);
}

export async function getCategories(): Promise<Category[]> {
  const categories = await wooFetch<WooCategory[]>('/products/categories', {
    searchParams: { per_page: 100, hide_empty: false },
  });
  return categories.map(mapCategory);
}
