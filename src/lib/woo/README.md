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

**Spec sheet PDF** is read from product meta key `_spec_sheet_url` (not yet exposed in the Woo
admin UI — add via a small plugin/snippet, or a custom REST field, once needed).

Until these are configured, every product maps to `purchaseMode: 'buy'` with no `brand`,
`department`, or `finishes` — the mapping degrades safely rather than throwing.
