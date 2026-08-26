# WooCommerce integration

Decision per build spec §6.1: **Woo REST API v3** (`/wp-json/wc/v3`), not WooGraphQL. The
catalog reads this storefront needs are simple (list + slug lookup + categories), so a typed
REST service layer is enough; revisit WooGraphQL only if query complexity grows.

`client.ts` holds the authenticated fetch wrapper (server-only — consumer key/secret are read
from `WOO_STORE_URL` / `WOO_CONSUMER_KEY` / `WOO_CONSUMER_SECRET` and must never reach a Client
Component or a `NEXT_PUBLIC_` variable). `products.ts` maps Woo's product/category shape onto
this app's `Product`/`Category` types (`src/lib/types.ts`).

## Required WP Admin setup

The storefront's `Product` model needs data Woo doesn't expose by default. Configure these as
**custom product attributes** (WooCommerce → Products → Attributes) and set them per product:

| Attribute name | Purpose | Expected values |
|---|---|---|
| `Purchase Mode` | Drives the site's central buy/poa rule (spec §7.1) | `Buy` or `POA` — defaults to `Buy` if unset |
| `Brand` | One of First Step's 9 carried brands | e.g. `Kohler`, `Grohe` |
| `Finish` | The only variation axis the storefront supports | e.g. `Chrome`, `Supersteel` |
| `Installation` | Presence of this attribute marks installation as an available add-on | any value |

**Department** (Bathroom & Wet Rooms / Kitchen & Surfaces / Climate Control / Home Technology)
is read from the product's Woo **category**, not an attribute — create these as top-level
product categories and assign each product to one.

`/collections/[department]` and its sub-category filter chips (`?sub=`) resolve by **category
slug**, so the top-level and child category slugs in Woo must match `src/data/departments.ts`
exactly. Child slugs are department-prefixed (`bathroom-baths`, not `baths`) because Woo
category slugs are unique across the whole store, not just within a parent — an unprefixed
`accessories` under both Bathroom and Kitchen would collide and Woo would silently rename one to
`accessories-2`, breaking the lookup.

- `bathroom` → `bathroom-baths`, `bathroom-basins`, `bathroom-showers`,
  `bathroom-taps-mixers`, `bathroom-accessories`
- `kitchen` → `kitchen-sinks`, `kitchen-taps`, `kitchen-work-surfaces`, `kitchen-appliances`,
  `kitchen-accessories`
- `hvac` → `hvac-cooling`, `hvac-heating`, `hvac-air-quality`, `hvac-controls`,
  `hvac-accessories`
- `home-tech` → `home-tech-lighting`, `home-tech-connected-control`, `home-tech-security`,
  `home-tech-accessories`

The brand filter on that page is **not** a Woo query param — `Brand` is a local (non-global)
attribute, so it isn't filterable via Woo's REST API. The page fetches the department's products
and filters by `product.brand` in memory instead, which is fine at this catalog's scale but
won't scale to a large multi-brand storefront. If `Brand` is later promoted to a **global**
attribute (`pa_brand`), switch to Woo's `attribute`/`attribute_term` REST params for server-side
filtering.

**Spec sheet PDF** is read from product meta key `_spec_sheet_url` (not yet exposed in the Woo
admin UI — add via a small plugin/snippet, or a custom REST field, once needed).

Until these are configured, every product maps to `purchaseMode: 'buy'` with no `brand`,
`department`, or `finishes` — the mapping degrades safely rather than throwing.
