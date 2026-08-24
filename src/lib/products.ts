import { apiFetch } from './api';
import { Product, ProductListResponse, Category } from './types';

export interface ProductQuery {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: 'price_asc' | 'price_desc' | 'newest';
  page?: number;
  limit?: number;
}

export async function getProducts(query: ProductQuery = {}): Promise<ProductListResponse> {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined) params.set(key, String(value));
  });

  const qs = params.toString();
  return apiFetch<ProductListResponse>(`/products${qs ? `?${qs}` : ''}`, {
    cache: 'no-store',
  });
}

export async function getProductBySlug(slug: string): Promise<Product> {
  return apiFetch<Product>(`/products/slug/${slug}`, { cache: 'no-store' });
}

export async function getCategories(): Promise<Category[]> {
  return apiFetch<Category[]>('/categories', { cache: 'no-store' });
}
