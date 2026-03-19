# The Crafted Tale — Software Ecosystem Design

**Date:** 2026-03-19
**Status:** Approved
**Stack:** Nuxt 4 + Vue 3 + Supabase (existing)

---

## Context

The Crafted Tale is an early-stage handicraft business selling a mix of custom, semi-custom, and ready-made products. The business is unregistered, has 3 physical orders to date, and collects payment offline. There is an active Instagram presence and an existing Nuxt waitlist page backed by Supabase.

The goal is to build a software ecosystem that grows with the business, starting from the most impactful piece: a public-facing product storefront.

---

## Phased Roadmap

| Phase | What | When |
|-------|------|------|
| **1 — Public Storefront** | Product catalog, about page, contact form, WhatsApp button | Now |
| 2 — User Auth & Orders | Email OTP login, order request system, user profiles | When traffic justifies it |
| 3 — Admin Panel | Product CRUD, order management, customer list | When managing via Supabase dashboard becomes painful |
| 4 — SEO & Marketing | Meta tags, Open Graph, sitemap, blog/content | After storefront is live |
| 5 — Payments | Razorpay/Stripe integration | After business registration |

This document covers **Phase 1** in detail. Later phases are intentionally deferred (YAGNI).

---

## Phase 1: Public Storefront

### Goal

Replace the waitlist-only site with a product showcase that drives WhatsApp conversations and contact form inquiries.

### Pages

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero + featured products + brand intro + CTA to browse catalog |
| Product Listing | `/products` | Grid of all products with category filter tabs |
| Product Detail | `/products/:slug` | Images, description, price, WhatsApp CTA |
| About | `/about` | Brand story, the craft, the maker(s) |
| Contact | `/contact` | Simple contact form (name, email/phone, message) |

A floating WhatsApp button appears on every page.

### Database Schema

Two new Supabase tables alongside the existing `waitlist` table.

#### `products`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key, auto-generated |
| name | text | Product name |
| slug | text | Unique, used in URL (`/products/hand-painted-diary`) |
| description | text | Full product description |
| price | numeric | Display price in INR |
| category | text | One of: `custom`, `semi_custom`, `ready_made` |
| images | text[] | Array of Supabase Storage public URLs |
| is_active | boolean | Default `true`. Set `false` to hide without deleting |
| display_order | integer | Controls sort order on the listing page |
| created_at | timestamptz | Auto-set on insert |
| updated_at | timestamptz | Auto-set on update |

#### `contact_messages`

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key, auto-generated |
| name | text | Sender's name |
| email | text | Nullable |
| phone | text | Nullable |
| message | text | The inquiry |
| is_read | boolean | Default `false`. For you to track in Supabase dashboard |
| created_at | timestamptz | Auto-set on insert |

At least one of `email` or `phone` is required (enforced in application logic).

Product images are stored in **Supabase Storage** (free tier: 1 GB — plenty for under 10 products).

### Product Management

In Phase 1, products are managed directly through the **Supabase dashboard** (table editor + storage UI). No custom admin panel yet. This is acceptable for under 10 products that change infrequently.

### File Structure

```
app/
├── app.vue                     # Layout shell (header, footer, WhatsApp float)
├── pages/
│   ├── index.vue               # Home page
│   ├── products/
│   │   ├── index.vue           # Product listing (grid + category filter)
│   │   └── [slug].vue          # Product detail page
│   ├── about.vue               # Brand story
│   └── contact.vue             # Contact form
├── components/
│   ├── AppHeader.vue           # Navigation bar (sticky, mobile hamburger)
│   ├── AppFooter.vue           # Footer with social links
│   ├── ProductCard.vue         # Card for the product grid
│   ├── WhatsAppFloat.vue       # Floating WhatsApp button (bottom-right)
│   ├── ContactForm.vue         # Contact form component
│   └── SocialItems.vue         # (existing)
├── composables/
│   └── useSupabase.ts          # Supabase client singleton
└── server/
    └── api/
        ├── waitlist.post.ts    # (existing)
        ├── products.get.ts     # GET all active products, sorted by display_order
        ├── products/
        │   └── [slug].get.ts   # GET single product by slug
        └── contact.post.ts     # POST contact form submission
```

### Component Details

#### AppHeader

- Sticky top navigation
- Logo (left) + nav links: Home, Products, About, Contact (right)
- Mobile: hamburger menu with slide-out drawer
- Active link highlighting

#### Home Page (`pages/index.vue`)

- **Hero section:** brand tagline, background image or gradient, primary CTA ("Browse Products")
- **Featured products:** 3–4 hand-picked or latest products in a card row
- **Brand snippet:** short paragraph about The Crafted Tale with link to About page
- **Social proof:** if testimonials exist, show 1–2; otherwise omit

#### Product Listing (`pages/products/index.vue`)

- **Category filter tabs:** All | Ready Made | Semi Custom | Custom
- **Responsive grid:** 2 columns on mobile, 3 on tablet, 4 on desktop
- **ProductCard:** image thumbnail, product name, price, category badge
- Clicking a card navigates to `/products/:slug`
- Data fetched via `GET /api/products`, optionally filtered by `?category=`

#### Product Detail (`pages/products/[slug].vue`)

- **Image gallery:** simple horizontal scroll or grid (no heavy carousel library)
- **Product info:** name, price, category badge, full description
- **CTAs:**
  - "Message on WhatsApp" — opens `wa.me` with pre-filled text including product name
  - "Send Inquiry" — navigates to `/contact?product=<slug>` with product pre-selected
- Data fetched via `GET /api/products/:slug`

#### About Page (`pages/about.vue`)

- Brand story: origin, inspiration, what makes the products handcrafted
- Optional: maker photo or workspace photo
- Link to Instagram

#### Contact Page (`pages/contact.vue`)

- **Fields:** name (required), email (optional), phone (optional), message (required)
- **Validation:** at least one of email or phone must be filled
- If arrived via product detail (`?product=slug`), pre-fill the message with the product name
- On submit: `POST /api/contact` → insert into `contact_messages`
- Success confirmation with "or reach us on WhatsApp" fallback link

#### WhatsAppFloat (`components/WhatsAppFloat.vue`)

- Fixed position, bottom-right corner
- WhatsApp icon button
- Links to `https://wa.me/91XXXXXXXXXX?text=Hi, I'm interested in your products!`
- Subtle entrance animation, doesn't overlap page content on mobile

### API Endpoints

#### `GET /api/products`

Returns all products where `is_active = true`, ordered by `display_order`.

Optional query param: `?category=ready_made` to filter.

#### `GET /api/products/:slug`

Returns a single product by slug. Returns 404 if not found or inactive.

#### `POST /api/contact`

Body: `{ name, email?, phone?, message }`

Validates at least one of email/phone is provided. Inserts into `contact_messages`. Returns `{ success: true }`.

### Data Flow

```
Supabase Storage (images)
        │
Supabase DB: products table
        │
Server API: /api/products ──→ Nuxt pages render catalog
        
Contact Form ──→ Server API: /api/contact ──→ Supabase DB: contact_messages
```

### Styling

Extend the existing visual identity:

- **Colors:** rose/pink gradient (`#c97b84` primary), white cards, gray text
- **Font:** Playfair Display (already loaded)
- **Cards:** white background, soft `box-shadow`, rounded corners (`1rem`)
- **Responsive breakpoints:** 480px (mobile), 768px (tablet), 1024px+ (desktop)
- **Consistent spacing:** 8px grid system

### What's Explicitly Out of Scope

- User authentication (Phase 2)
- Order request system (Phase 2)
- Admin panel for product management (Phase 3)
- Payment processing (Phase 5)
- Shopping cart
- Inventory tracking
- Email notifications

---

## Future Phases (Brief Notes)

### Phase 2 — User Auth & Orders

- Supabase Auth with email OTP (free tier)
- User profile: name + phone number
- Two order flows:
  - "Order This" on product detail (for ready-made / semi-custom) with customization notes
  - General inquiry for fully custom work
- Orders stored in Supabase, managed through dashboard initially
- Login required only for placing orders; browsing stays public

### Phase 3 — Admin Panel

- Protected `/admin` routes behind Supabase auth (admin role)
- Product CRUD with image upload
- Order management (new → confirmed → in-progress → fulfilled)
- Customer and waitlist views

### Phase 4 — SEO & Marketing

- Dynamic meta tags and Open Graph per product page
- Auto-generated sitemap
- Structured data (JSON-LD) for products
- Optional blog section for organic traffic

### Phase 5 — Payments

- Integrate Razorpay or Stripe after business registration
- Convert order requests into payable orders
- Payment confirmation flow
