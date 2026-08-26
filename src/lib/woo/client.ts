const WOO_STORE_URL = process.env.WOO_STORE_URL;
const WOO_CONSUMER_KEY = process.env.WOO_CONSUMER_KEY;
const WOO_CONSUMER_SECRET = process.env.WOO_CONSUMER_SECRET;

interface WooRequestOptions extends RequestInit {
  searchParams?: Record<string, string | number | boolean | undefined>;
}

interface WooListResult<T> {
  data: T;
  total: number;
  totalPages: number;
}

function buildUrl(path: string, searchParams?: WooRequestOptions['searchParams']) {
  if (!WOO_STORE_URL || !WOO_CONSUMER_KEY || !WOO_CONSUMER_SECRET) {
    throw new Error(
      'WooCommerce is not configured: set WOO_STORE_URL, WOO_CONSUMER_KEY, WOO_CONSUMER_SECRET.',
    );
  }

  const url = new URL(`/wp-json/wc/v3${path}`, WOO_STORE_URL);
  url.searchParams.set('consumer_key', WOO_CONSUMER_KEY);
  url.searchParams.set('consumer_secret', WOO_CONSUMER_SECRET);
  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (value !== undefined) url.searchParams.set(key, String(value));
  });
  return url;
}

async function performRequest(path: string, options: WooRequestOptions = {}) {
  const { searchParams, ...rest } = options;
  const url = buildUrl(path, searchParams);

  const isMutation = rest.method && rest.method !== 'GET';
  const res = await fetch(url.toString(), {
    ...rest,
    // Catalog reads: Woo admin updates aren't every-request-fresh. Mutations (orders) must never cache.
    ...(isMutation ? { cache: 'no-store' as const } : { next: { revalidate: 300 } }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`WooCommerce request failed (${res.status} ${path}): ${body.slice(0, 300)}`);
  }

  return res;
}

/** Server-only. Never import this module from a Client Component. */
export async function wooFetch<T>(path: string, options: WooRequestOptions = {}): Promise<T> {
  const res = await performRequest(path, options);
  return res.json() as Promise<T>;
}

/** Like wooFetch, but also reads Woo's X-WP-Total / X-WP-TotalPages pagination headers. */
export async function wooFetchList<T>(
  path: string,
  options: WooRequestOptions = {},
): Promise<WooListResult<T>> {
  const res = await performRequest(path, options);
  const data = (await res.json()) as T;
  return {
    data,
    total: Number(res.headers.get('X-WP-Total') ?? 0),
    totalPages: Number(res.headers.get('X-WP-TotalPages') ?? 0),
  };
}
