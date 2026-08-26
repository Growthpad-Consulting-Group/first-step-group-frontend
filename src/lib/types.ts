export type PurchaseMode = 'buy' | 'poa';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
}

export interface ProductImage {
  url: string;
  alt?: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** One of First Step's 9 carried brands, when set on the product in Woo. */
  brand?: string;
  /** One of the 4 storefront departments (Bathroom & Wet Rooms, Kitchen & Surfaces, Climate Control, Home Technology). */
  department?: string;
  category: string;
  reference?: string;
  summary?: string;
  description?: string;
  images: ProductImage[];
  /** Variation axis — the only one the storefront supports today. */
  finishes: string[];
  specs: ProductSpec[];
  specSheetUrl?: string;
  installationAvailable: boolean;
  installationPrice?: number;
  /** The central commerce rule: `buy` shows price + cart actions, `poa` hides price and shows enquiry actions. */
  purchaseMode: PurchaseMode;
  /** USD. Present only when purchaseMode === 'buy'. */
  price?: number;
  compareAtPrice?: number;
  availability: string;
  stock: number;
  relatedProductIds: string[];
  bundleIds?: string[];
  updatedAt?: string;
}

export interface ProductListResponse {
  items: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CartLine {
  productId: string;
  finish?: string;
  quantity: number;
  installation: boolean;
  unitPrice: number;
  lineTotal: number;
}

export interface CartSummary {
  subtotal: number;
  installationTotal: number;
  delivery: number | 'quote';
  total: number;
}
