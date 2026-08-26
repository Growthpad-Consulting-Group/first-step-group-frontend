# First Step Group — Storefront Build Spec (Merged)

> A build guide for an AI IDE / coding agent. It combines the **product spec** (First Step's specific rules, derived from the Figma designs) with **engineering-process discipline** (testing, security, error handling, ways of working). Where a value must come from the client or Figma, it is marked `TODO`. Do not invent business rules or payment behaviour that aren't here — consult official docs or ask.

**Conflict resolutions applied when merging two source docs (read once):**
- **Payment gateway = Stanbic Bank Zimbabwe** (client-confirmed). Paystack was dropped — it does not offer merchant accounts to Zimbabwe-registered businesses.
- **Process = Kanban**, not fixed sprints. The 8-phase roadmap below is a *sequence*, not calendar-boxed sprints.
- **Asana = free plan** → use Sections + Tags, not premium custom fields.
- **Commerce model is dual (buy vs price-on-application)** — generic "every product adds to cart" assumptions are overridden by §7.

---

## 1. Project overview

First Step is a **premium kitchen, bathroom, climate-control and home-technology fixtures retailer** based in Borrowdale, Harare, Zimbabwe. It carries nine brands (Victoria + Albert, Kohler, Grohe, hansgrohe, Franke, Smeg, Cosentino, Dadoquartz, Meir), runs a physical showroom, and sells through a mix of **direct online purchase** and **enquiry / price-on-application (POA)** for showroom-tier products.

The site is a **headless storefront**: a Next.js front end consuming WooCommerce (commerce) and Sanity (editorial), fronted by Cloudflare, with payments via Stanbic.

The result must be production-oriented: responsive, accessible, SEO-friendly, secure, performant and maintainable by the team after launch.

### Design source
Figma file `First-step-UI` (key `I0W4AURm0nJB4DeQ4WGux2`). 

Here are all the frames we mapped, in screen order (file key I0W4AURm0nJB4DeQ4WGux2):

01 — Home
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=207-3

02 — Collection / Bathroom
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=255-2

03 — Collection / Kitchen
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=301-573

04 — Brand / Victoria + Albert
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=207-139

05 — Brand / Kohler
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=277-315

06 — Showroom
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=209-2

07 — All Collections
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=438-1225

08 — All Brands
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=460-1426

09 — Collection / Climate Control
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=483-1857

10 — Product Detail (direct-buy)
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=520-1843

11A — Cart Drawer / Product Added
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=548-2056

11B — Cart Drawer / Empty
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=548-2062

12 — Full Cart
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=567-2078

13 — Checkout
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=569-2279

14 — Order Confirmation
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=574-2480

15 — Shop Landing
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=576-2683

16 — Product Detail / Barcelona (POA)
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=599-2880

17 — Product Detail / Amalfi (POA)
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=599-3040

18 — Product Detail / Ios (POA)
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=599-3200

19 — Contact & Inquiry
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=736-3536

20 — Our Story / About
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=745-3742

21 — Journal
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=777-3946

22 — Journal Article
https://www.figma.com/design/I0W4AURm0nJB4DeQ4WGux2/First-step-UI?node-id=791-4150


All launch-scope screens are designed **except** customer account/auth, search results, and (optional) product compare — see §14. Before implementing any screen, inspect its frame and reuse the design system; do not invent visual changes except for accessibility, responsiveness, performance or a genuine technical limit.

---

## 2. Architecture

```
                    Customer
                       │
                 Cloudflare  (DNS / SSL / CDN / WAF / cache)
                       │
                 Next.js (App Router)  ── Vercel
                 storefront + server/BFF layer
             ┌─────────┼───────────────┐
     products/orders  editorial      payments
             │         │               │
     WooCommerce     Sanity        Stanbic (ZW)
     (WordPress/cPanel)             e-commerce gateway
```

**Responsibilities**
- **Next.js (App Router, TypeScript, Vercel)** — the entire customer experience + a thin server/BFF layer for cart, checkout, quote/enquiry, booking, and payment verification.
- **WooCommerce (WordPress on cPanel)** — system of record for products, categories, attributes, variations, prices, stock, customers, orders, coupons, shipping, tax, and the payment/order status lifecycle. Do **not** duplicate the Woo product/order database inside Next.js.
- **Sanity** — editorial: articles, authors, categories, marketing/editorial content sections, editorial SEO fields.
- **Cloudflare** — DNS, SSL (Full Strict), CDN/caching, WAF, domain routing.
- **Stanbic** — card payment processing (see §9).

### Rendering strategy (decide once, apply consistently)
- **Static / ISR:** home, shop landing, collection/PLP, brand pages, product detail, journal, about, contact. Revalidate on Woo/Sanity webhooks.
- **Dynamic / SSR or client:** cart, checkout, account, search results.
- Never cache authenticated, cart, or checkout responses at the CDN.

---

## 3. Critical rules

The customer should experience one unified website and never need to know WordPress or Sanity exist. Communicate with backends through server-side/API layers only. **Never** put WooCommerce secret keys, Stanbic/payment secrets, Sanity private tokens, or WordPress credentials into client components or `NEXT_PUBLIC_` variables. Never trust client-submitted totals or a client-side "payment successful" signal — verify server-side.

---

## 4. Repository & conventions

Use the App Router. Suggested structure (adapt to an existing sound repo rather than rewriting it):

```
src/
├── app/
│   ├── (store)/            # home, shop, collections, brands, product, cart, checkout, account, showroom, contact, about
│   ├── journal/            # index + [slug]
│   ├── api/                # commerce, checkout, payments (Stanbic verify/webhook), revalidate, enquiry, booking
│   ├── sitemap.ts · robots.ts · not-found.tsx · error.tsx · loading.tsx
├── components/             # layout, navigation, product, cart, checkout, account, blog, ui, common
├── lib/
│   ├── woo/                # client + products/categories/cart/orders/customers/types
│   ├── sanity/             # client + GROQ queries
│   ├── payments/           # Stanbic integration + verification
│   ├── commerce/           # cart, pricing, POA logic (framework-agnostic)
│   ├── auth/ · seo/ · utils/
├── hooks/ · types/ · config/ · styles/
```

- TypeScript strict. Server Components by default; Client Components only where interactivity requires them (cart drawer, filters, finish selector, checkout form).
- Keep business logic out of presentation components; keep every external integration in its `lib` service module. Type and validate all external API responses.
- Styling: `TODO` confirm (Tailwind recommended; map Figma tokens to theme — §12).
- ESLint + Prettier; CI blocks merge on lint/type errors.

---

## 5. Environment variables

Separate dev / preview / production. Expose `NEXT_PUBLIC_` only when truly browser-safe. Never commit secrets.

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SITE_NAME=First Step
# WooCommerce
WOO_STORE_URL=
WOO_CONSUMER_KEY=
WOO_CONSUMER_SECRET=
WOO_GRAPHQL_URL=              # if using WPGraphQL/WooGraphQL
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
SANITY_API_VERSION=
SANITY_API_READ_TOKEN=
SANITY_WEBHOOK_SECRET=
# Payments — Stanbic Bank Zimbabwe e-commerce gateway
STANBIC_GATEWAY_BASE_URL=     # confirm from merchant agreement / gateway docs
STANBIC_MERCHANT_ID=
STANBIC_API_KEY=              # server-side only
STANBIC_API_SECRET=           # server-side only
STANBIC_WEBHOOK_SECRET=       # if callbacks are signed
# Contact / commerce
WHATSAPP_NUMBER=              # intl format, no +  e.g. 2637XXXXXXXX
# Ops
NEXT_PUBLIC_GA_ID=
REVALIDATE_SECRET=
```

---

## 6. Data layer

### 6.1 WooCommerce access
Choose **WooGraphQL (WPGraphQL + WPGraphQL for WooCommerce)** or **Woo REST**. Default recommendation: WooGraphQL for typed, single-round-trip catalog reads; REST for admin-ish operations it lacks. Document the decision in `/lib/woo/README.md`. Provide a service layer (`getProducts`, `getProductBySlug`, `getCategories`, `getProductVariations`, `createOrder`, `getOrder`, `updateOrder`, …); never scatter raw Woo requests through components.

### 6.2 Sanity access
GROQ via read token; CDN for published content, direct API for preview mode.

### 6.3 Caching / revalidation
Woo and Sanity webhooks → `POST /api/revalidate` (guarded by `REVALIDATE_SECRET`) → revalidate affected tags/paths (stock, price, new product, published article). Use realistic API contracts from the start — do **not** build the UI against fake data and assume Woo will behave identically later.

---

## 7. Domain model & commerce rules

### 7.1 Product
```ts
type Finish = "chrome" | "hard-graphite" | "warm-sunset" | "supersteel"; // extend as needed

interface Product {
  id: string; slug: string; name: string;
  brand: Brand;                 // one of the 9
  department: Department;       // §7.3
  category: string;             // e.g. "Baths", "Taps & Mixers"
  reference: string;            // SKU / manufacturer ref
  summary: string; description: string; images: Image[];
  finishes: Finish[];           // variation axis = FINISH
  specs: { label: string; value: string }[];
  specSheetUrl?: string;        // "View Official Spec" (PDF)
  installationAvailable: boolean; installationPrice?: Money;
  purchaseMode: "buy" | "poa";  // ← THE central rule
  price?: Money;                // absent when purchaseMode === "poa"
  availability: string;
  relatedProductIds: string[]; bundleIds?: string[]; // frequently bought together
}
```

**The single most important rule — every product is `buy` or `poa`:**
- `buy` → shows price, quantity, finish, optional installation, **Add to Cart** + **Buy Now**.
- `poa` (showroom-tier) → hides price (shows a "Showroom product" badge), and **replaces cart actions** with **Request Price (WhatsApp)**, **Request a Quote**, **Book Showroom Viewing**.

Model `poa` in Woo via a flag/attribute (or a Request-a-Quote / Catalog-Mode approach). Branch every place a product renders (cards, PLP, PDP) on `purchaseMode`. Only `buy` products may enter the cart.

### 7.2 Cart line & order
```ts
interface CartLine { productId: string; finish: Finish; quantity: number;
  installation: boolean; unitPrice: Money; lineTotal: Money; }
interface CartSummary { subtotal: Money; installationTotal: Money;
  delivery: Money | "quote"; total: Money; }
```

### 7.3 Taxonomy
- **Departments (4):** Bathroom & Wet Rooms · Kitchen & Surfaces · Climate Control · Home Technology.
- **Brands (9):** Victoria + Albert · Kohler · Grohe · hansgrohe · Franke · Smeg · Cosentino · Dadoquartz · Meir.
- Each department has sub-categories used as PLP filters (Bathroom: Baths, Basins, Showers, Taps & Mixers, Accessories; Kitchen: Sinks, Taps, Work Surfaces, Appliances, Accessories; Climate: Cooling, Heating, Air Quality, Controls, Accessories).

### 7.4 Sanity (editorial)
```
article  { title, slug, excerpt, hero, body(portable text), author->, categories[], publishedAt, seo }
author   { name, slug, bio, avatar }
section  { type, heading, body, media, cta }   // reusable marketing/content blocks
```

### 7.5 Commerce rules (enforce everywhere)
1. **Dual model** — `buy` vs `poa` per §7.1.
2. **Finish** is the only variation axis; selecting one may change availability/price. Map selection to a valid Woo variation.
3. **Installation** — optional **paid add-on** toggled per line, carried cart → summary → checkout → order.
4. **Fulfilment** — at checkout: **Deliver to address** (Zimbabwe; City + Province) or **Collect from showroom**.
5. **Payment methods** (checkout step 3): **Card (Stanbic)**, **Bank Transfer**, **Pay by Quote**. Bank transfer and quote imply **manual verification** → orders may enter a **"Payment review"** status shown on the confirmation screen (§9).
6. **WhatsApp** is first-class: click-to-chat with prefilled messages for Request Price, Ask a Specialist, and support. `https://wa.me/<WHATSAPP_NUMBER>?text=<encoded>`.
7. **Spec sheets** — optional downloadable PDF per product ("View Official Spec").
8. **Cross-sell** — related products + a "Frequently bought together" bundle bar on the PDP.
9. **Currency** — USD display (`TODO` confirm formatting/rounding).
10. **Inquiry form** (Contact & Inquiry, frame 19) — one form serving all enquiry CTAs. Fields: first/last name, email, phone, **inquiry type** (Product & Pricing / Request a Quote / Showroom Visit / General), message. POA actions and site-wide "Inquire Now / Start an Inquiry" CTAs route here (pre-selecting the matching type) or to WhatsApp; attach product context when launched from a PDP. Submissions notify the team (`TODO` email/CRM/WhatsApp destination).

---

## 8. Product experience (behaviour)

- **PLP / archive:** category + brand filters, search, sort, pagination/progressive load, product cards (price **or** "Showroom product" badge by `purchaseMode`), stock state, responsive grid, empty + loading states.
- **PDP:** gallery, title, reference, finish selector, installation toggle, quantity, availability, specs + spec-sheet download, related, bundle bar; `buy` variant shows Add to Cart/Buy Now, `poa` variant shows the enquiry actions.

---

## 9. Payment architecture (Stanbic)

**Provider:** Stanbic Bank Zimbabwe e-commerce gateway. It accepts Visa/Mastercard in multiple currencies (USD supported) and offers hosted-page, pay-by-link, and direct-API integration models. The **exact integration method and API contract are confirmed after the merchant agreement** — the agent must follow the official Stanbic/gateway documentation provided at onboarding and **must not invent payment behaviour**.

**Flow**
```
Checkout → create WooCommerce order (status: pending)
        → hand off to Stanbic (hosted page or API per agreement)
        → customer pays → provider callback/webhook
        → SERVER verifies transaction (never trust client) → update Woo order status
        → Next.js shows result (Order Confirmation)
```

**Requirements**
- Create the Woo order **before** payment; keep Woo the status source of truth.
- Verify every transaction server-side; verify webhook signatures where supported.
- Idempotent webhook handling (dedupe duplicate callbacks).
- Handle failed / cancelled / abandoned / retried payments and refunds.
- **Bank Transfer** and **Pay by Quote** are manual-settlement paths → order enters **"Payment review"**; confirmation screen (frame 14) reflects this; the team confirms and advances the order.
- `TODO`: confirm whether card runs as hosted redirect or direct API; whether the underlying processor is MPGS/N-Genius/other; supported currencies for the merchant account.

---

## 10. Routes / pages (verified against Figma frames)

| Route | Screen (frame) | Notes |
|---|---|---|
| `/` | Home (01) | Hero, collections, difference, brand partners, showroom, journal, contact |
| `/shop` | Shop Landing (15) | Shop-by-collection, featured products, brand index, support panel |
| `/collections` | All Collections index (07) | 4 department gateways + guided selection |
| `/collections/[department]` | Collection PLP (02/03/09 + Home Tech) | Templated; filters, brand filter, featured + grid |
| `/brands` | All Brands index (08) | Signature houses + full portfolio (9) |
| `/brands/[brand]` | Brand landing (04/05) | Templated for all 9; story, collection, features, related |
| `/product/[slug]` | Product Detail | Renders **buy** (10) or **poa** (16/17/18) by `purchaseMode` |
| `/cart` | Full Cart (12) | + global cart **drawer** (11A added / 11B empty) |
| `/checkout` | Checkout (13) | Single page, 4 steps: Contact → Delivery/Collection → Payment → Review |
| `/checkout/confirmation/[orderId]` | Order Confirmation (14) | Order no., payment-review status, next-steps tracker |
| `/showroom` | Showroom (06) | Experience, plan-your-visit, map, booking CTA |
| `/journal` | Journal index (21) | Featured story + filterable article grid |
| `/journal/[slug]` | Article (22) | Hero/dek/meta, numbered-section body, sidebar, related |
| `/about` | Our Story (20) | Why First Step + Our Approach (Discover→Compare→Specify→Coordinate) |
| `/contact` | Contact & Inquiry (19) | Direct-contact panel + inquiry form (§7.5.10) |
| `/search` | Search results | **[NEEDS DESIGN]** — filters + sort |
| `/account/*` | Account & auth | **[NEEDS DESIGN]** — login, register, orders/tracking |

---

## 11. Component library

Extract from the Figma component set; build these first (every screen composes them): **Sticky Glass Header** + **Contact + Footer** (global), **Product Card** (price vs "Showroom product" badge by `purchaseMode`), **Brand Card**, **Filters** (sub-category chips, brand filter, sort), **Cart Drawer** (added + empty), **Finish Selector**, **Installation Toggle**, **Price Badge**, **Buttons** (primary/secondary/WhatsApp), **Checkout Stepper**, **Quantity Control**, **Purchase Assurance** row. Prefer data-driven templates (one Collection PLP, one Brand landing) over per-instance pages. Also standard UI: Input, Select, Modal, Drawer, Breadcrumbs, Pagination, Accordion, Toast, LoadingSkeleton.

---

## 12. Design tokens

Pull exact values from Figma fills/text styles. Starting point (replace with real tokens):

```css
--color-gold:    #C6982F;  /* primary accent (confirm) */
--color-gold-lt: #D4AF37;
--color-cream:   #F5E6C0;
--color-ink:     #1C1C1C;  /* near-black ground */
--color-bg:      #FFFFFF;
/* type: confirm families + scale from Figma text styles; spacing looks like an 8px grid */
```
Accessibility: verify **gold-on-dark** contrast meets WCAG AA before shipping.

---

## 13. Key flows

- **Add to cart (buy):** finish → optional installation → add → drawer (11A) → Full Cart (12) → Checkout (13).
- **POA / enquiry:** PDP (16/17/18) → Request a Quote / Request Price (WhatsApp) / Book Showroom Viewing → server records request / opens WhatsApp with product context.
- **Checkout (single page, 4 steps):** Contact → Delivery (City/Province) or Showroom collection → Payment (Card / Bank Transfer / Pay by Quote) → Review + terms → Place Order → Confirmation (14) with payment-review status when manual.
- **Booking:** Book a Visit / Book Showroom Viewing → form/booking tool → notify showroom.

---

## 14. Not yet designed (blockers)

Journal/Article, About, and Contact/Inquire are designed (frames 21, 22, 20, 19). Remaining — do **not** guess; scaffold routes with clearly-marked placeholders and flag them:
- **Account & auth** — login, register, dashboard, order history/tracking.
- **Search results** — list with department/brand filters and sort.
- **Compare Products** (optional) — referenced in the Shop Landing support panel.

Note: the checkout supports guest purchase, so account/auth may not block launch — confirm scope with the client.

---

## 15. Non-functional requirements

- **SEO:** dynamic titles + meta, canonical, OpenGraph/social, `sitemap.xml`, `robots.txt`, JSON-LD (Product, Breadcrumb, Article), clean URLs, correct 404s, redirects, indexability controls. Product SEO from Woo; editorial SEO from Sanity; no duplicate sources without a clear priority.
- **Performance:** target strong Core Web Vitals; `next/image` with responsive sizes; lazy-load where sensible; Server Components by default; minimal client JS; code-split; efficient API calls; CDN. Don't make every component a Client Component.
- **Accessibility:** target WCAG 2.2 AA — semantic HTML, keyboard nav, visible focus, labelled/accessible form errors, accessible dialogs, heading hierarchy, alt text, contrast, screen-reader status messages. Never rely on colour alone for state.
- **Analytics/observability:** GA4 ecommerce events + WhatsApp/quote/booking events; error monitoring (Sentry FE, server logging Woo) — set up early.
- **Images:** replace all Figma placeholders ("replace with final client photo") with real product photography via the content pipeline.

---

## 16. Error handling

Treat every external service as unreliable. Handle: Woo unavailable, Sanity unavailable, Stanbic unavailable, network timeout, invalid product, out-of-stock, invalid variation, failed order creation, failed/cancelled payment, expired session, API rate limits. Show useful messages; log technical detail server-side; never expose secrets or stack traces to customers.

---

## 17. Loading & empty states

Every async page/action gets an intentional state: product loading / not found, no search results, empty category, empty cart, checkout loading, payment processing, payment failed, order confirmation, journal loading/empty. No blank screens while loading.

---

## 18. Authentication

If Woo remains the customer/order source of truth, define clearly how Next.js authenticates against it; do not create a second identity system without strong reason. Support (where in scope): login, registration, logout, password reset, profile, saved addresses, order history. Sessions must be secure (HTTP-only cookies); never store auth secrets in `localStorage` without a reviewed reason. (Screens are **[NEEDS DESIGN]** — §14.)

---

## 19. Testing strategy

Test the full journey.
- **Product:** loads; categories; variations; stock; correct prices; `buy` vs `poa` rendering.
- **Cart:** add product/variation; update qty; remove; empty; stock changes; installation add-on math.
- **Checkout:** required + invalid fields; delivery vs collection; totals; order creation.
- **Payment (Stanbic):** successful; failed; cancelled; duplicate webhook; invalid webhook; retry; refund; bank-transfer/quote "payment review" path.
- **Enquiry/POA:** Request a Quote, Request Price (WhatsApp), Book Showroom Viewing, inquiry form types.
- **Account:** register; login; logout; password reset; order history (when built).
- **CMS:** publish/update article; SEO metadata; images; author; categories.
- **Responsive:** mobile / tablet / laptop / desktop. **Browsers:** Chrome, Safari, Firefox, Edge.

---

## 20. Security

Never commit secrets. Enforce: HTTPS everywhere; secure cookies; server-side secret handling; webhook signature verification; input validation; output sanitisation; rate limiting where appropriate; Cloudflare WAF; WordPress hardening (strong admin creds, least-privilege users, limited exposed endpoints, updates, automated backups). Protect Woo API credentials. Verify payment status server-side.

---

## 21. Deployment & environments

- **Dev:** Next.js local; WordPress/Woo on a dev/staging server; Sanity dev dataset.
- **Preview:** a Vercel preview per PR/branch.
- **Production:** Cloudflare → Vercel (Next.js) and → WordPress/Woo; Sanity runs independently.

---

## 22. Git workflow

Trunk-based with short-lived feature branches (`feature/…`); never commit to `main` directly; PRs with review on important changes; lint/type/tests pass before merge; meaningful commits; focused PRs; no secrets in history.

---

## 23. Ways of working

- **Kanban** (no fixed sprints): pull tasks **Backlog → Ready → In Progress → In Review → Done**; WIP limit ~2 "In Progress" per person; async daily standup in Slack. Asana = source of truth for tasks; Slack = communication; Figma = design; GitHub = code.
- **Asana on free plan:** use **Sections** for epics and **Tags** for Workstream/Priority (custom fields are premium — skip). Ownership via Assignee. Milestones as diamond tasks.
- **Phase roadmap (sequence, not calendar sprints):** 1 Foundation → 2 Core design & commerce model → 3 Product experience → 4 Cart, content & commerce config → 5 Checkout & Stanbic integration → 6 QA & hardening → 7 UAT & production prep → 8 Launch & stabilisation.
- **Milestones:** Foundations complete · Product data model + API locked · Design gaps closed (account/search) · Commerce backend feature-complete · Storefront feature-complete · Launch-ready.
- **Team:** PM (planning, Asana, dependencies, client/UAT, launch) · Designer (Figma, design system, states, handoff, design QA — works slightly ahead of dev) · Dev 1 (Next.js/UI/responsive/SEO/perf) · Dev 2 (WordPress/Woo/APIs/Stanbic/orders/integrations). Both devs review each other's work.

---

## 24. Build order

1 Inspect repo → 2 Architecture → 3 Env vars → 4 Next.js foundation → 5 WooCommerce → 6 Sanity → 7 Cloudflare/domain → 8 Design system → 9 Global layout → 10 Home → 11 Woo product integration → 12 PLP → 13 PDP (buy + poa) → 14 Search → 15 Cart → 16 Checkout → 17 Order creation → 18 Accounts → 19 Stanbic payments → 20 Payment webhooks/verification → 21 Sanity journal/content → 22 SEO → 23 Analytics → 24 QA → 25 Security review → 26 Performance → 27 UAT → 28 Production → 29 Post-launch monitoring.

**Critical path:** Foundations → product data model + API → the UI that consumes it. Don't build payments before the order/checkout architecture is understood. Don't build the UI against fake commerce data. The POA/quote split and manual payment verification are the most easily underestimated — design and test them early.

---

## 25. Definition of Ready

A task enters development only when: requirements are clear; design is available where required; acceptance criteria exist; dependencies are identified; required API/backend behaviour is understood; assets are available; the assignee can start without waiting for basic information.

---

## 26. Definition of Done

Done when: implementation + responsive behaviour complete; loading/error/empty states handled; renders against **real data** (no hardcoded commerce/editorial content); `buy`/`poa` branching handled where products appear; lint/type clean; relevant tests pass; no obvious console errors; Figma implementation reviewed; API integration works; security considered; PR reviewed where applicable; acceptance criteria met; deployed to the appropriate environment. **Payment tasks:** both success and failure paths tested.

---

## 27. Rules for the AI IDE

1. Inspect the existing repo before changing architecture; don't rewrite working code unnecessarily. 2. Follow existing reasonable conventions. 3. Prefer reusable components. 4. Keep business logic out of presentation. 5. Keep integrations in dedicated service modules. 6. Keep secrets server-side. 7. Type + validate external API data. 8. Handle loading/error/empty states. 9. Maintain accessibility + responsiveness. 10. Optimise for Core Web Vitals; avoid unnecessary Client Components. 11. Avoid duplicated state. 12. Don't hardcode commerce data (Woo) or editorial content (Sanity). 13. Don't invent payment behaviour; verify payment status server-side; follow official Stanbic docs. 14. Branch on `purchaseMode` wherever products render. 15. Never expose private credentials. 16. Don't mark work complete without testing. 17. Before implementing a Figma screen, inspect the frame and reuse the design system. 18. If an external API's behaviour is uncertain, consult its current official documentation rather than guessing. 19. Keep changes focused and explain important architectural decisions.

---

## 28. Final principle

The finished site should feel like one custom-built platform: Next.js = experience, WooCommerce = commerce engine, Sanity = content engine, Stanbic = payment engine, Cloudflare = network/security, Vercel + cPanel = infrastructure. The front end must be decoupled from the WordPress theme; WordPress serves as the commerce backend, not the presentation layer. Structure everything so new payment methods, products, content types and features can be added later without a rewrite.