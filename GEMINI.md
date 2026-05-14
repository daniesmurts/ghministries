# GHMinistries — MASTER BUILD PROMPT
## Kinetic Sanctity Digital Presence

---

> Paste this entire document as your first message in any vibe coding session (Cursor, Windsurf, Lovable, v0, etc.). Do not skip any section.

---

## 1. PROJECT IDENTITY

You are building the official website for **ghministriesMoscow** — an ultra-modern, minimalistic international church movement headquartered in Moscow, Russia. The mission mandate is "Spirit-led, Mission-conscious, and Kingdom-minded."

The visual language is named **Kinetic Sanctity**: the fusion of reverent tradition and the kinetic energy of a global movement. This site must feel like it belongs alongside the world's finest institutional and cultural websites — not beside a typical church template.

**Tagline:** *Spirit-led. Mission-conscious. Kingdom-minded.*
**Design language:** Ultra-modern · Minimalistic · International · Light · Airy

---

## 2. TECH STACK (NON-NEGOTIABLE)

```
Framework:      Next.js 14+ with App Router + TypeScript (strict)
Styling:        Tailwind CSS v3 + CSS custom properties
Font:           Manrope (Google Fonts) — all weights 200–800
Icons:          Lucide React (outline only, consistent stroke-width: 1.5)
Animation:      Framer Motion — scroll reveals, page transitions, micro-interactions
Forms:          React Hook Form + Zod validation
Email:          Resend (API route, server-side only)
Maps:           Mapbox GL JS (for Global Locations interactive map)
State:          Zustand (lightweight, for cart/store, language toggle)
i18n:           next-intl (English + Russian language support)
Deployment:     Vercel
CMS (optional): Sanity.io for sermons, events, blog, leadership — use if instructed
```

---

## 3. DESIGN SYSTEM — KINETIC SANCTITY

### 3.1 Color Tokens

```css
:root {
  /* Surfaces */
  --color-surface-base:      #f9f9f9;   /* primary page background */
  --color-surface-elevated:  #ffffff;   /* cards, modals, nav */
  --color-surface-subtle:    #f2f2f4;   /* section alternates */
  --color-surface-dark:      #0d0d10;   /* dark sections, footer */

  /* Brand */
  --color-accent-purple:     #6344FF;   /* primary accent — royalty, Spirit */
  --color-accent-purple-10:  #6344FF1A; /* ghost / badge fill */
  --color-accent-purple-20:  #6344FF33;
  --color-accent-orange:     #FF5C1A;   /* action / fire / CTA */
  --color-accent-orange-10:  #FF5C1A1A;

  /* Text */
  --color-text-primary:      #0d0d10;
  --color-text-secondary:    #5a5a6e;
  --color-text-tertiary:     #9898aa;
  --color-text-inverse:      #ffffff;

  /* Borders */
  --color-border:            #e8e8ec;
  --color-border-strong:     #d0d0da;

  /* Semantic */
  --color-success:           #16a34a;
  --color-error:             #dc2626;
  --color-warning:           #d97706;

  /* Effects */
  --backdrop-blur:           blur(20px) saturate(180%);
  --shadow-card:             0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
  --shadow-elevated:         0 8px 40px rgba(0,0,0,0.10);
}
```

### 3.2 Typography Scale

```css
/* All type: Manrope — import all weights */
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');

--font-display: 'Manrope', sans-serif;   /* headings */
--font-body:    'Manrope', sans-serif;   /* body */

/* Scale */
--text-xs:   0.75rem  / 1.5   / 500
--text-sm:   0.875rem / 1.6   / 400
--text-base: 1rem     / 1.7   / 400
--text-lg:   1.125rem / 1.6   / 400
--text-xl:   1.25rem  / 1.5   / 500
--text-2xl:  1.5rem   / 1.4   / 600
--text-3xl:  1.875rem / 1.3   / 700
--text-4xl:  2.25rem  / 1.2   / 700
--text-5xl:  3rem     / 1.1   / 800
--text-6xl:  3.75rem  / 1.05  / 800
--text-7xl:  4.5rem   / 1.0   / 800
```

### 3.3 Spacing & Shape Tokens

```
Border radius: 8px (--radius-sm), 12px (--radius-md), 16px (--radius-lg), 24px (--radius-xl), 9999px (--radius-pill)
Spacing unit:  8px base grid
Section padding: py-24 (desktop), py-16 (mobile)
Container max-width: 1280px, with px-6 (mobile) → px-8 (tablet) → px-12 (desktop) padding
```

### 3.4 Animation Principles

```
Entrance: fade-up (y: 24px → 0, opacity: 0 → 1, duration: 0.6s, ease: [0.22, 1, 0.36, 1])
Stagger: 0.08s between siblings
Hover lift: translateY(-2px), shadow deepens — 200ms ease
Page transition: fade (0.3s) via Framer Motion AnimatePresence
Scroll-triggered: use Framer Motion whileInView, once: true, threshold: 0.15
Loading states: skeleton shimmer using CSS gradient animation
Never: bounce, elastic, or overly playful easing — maintain gravitas
```

---

## 4. COMPONENT LIBRARY

Build these shared components first, before any pages:

```
/components/ui/
  Button.tsx          — variants: primary (orange), secondary (purple ghost), ghost, destructive
  Badge.tsx           — variants: purple, orange, neutral, success, error
  Card.tsx            — base card with optional hover lift
  SectionHeader.tsx   — eyebrow label + heading + subtext, centered or left-aligned
  AnimatedSection.tsx — Framer Motion wrapper for scroll reveals
  Input.tsx           — styled text input with label, error state, helper text
  Textarea.tsx
  Select.tsx
  Checkbox.tsx
  Modal.tsx           — accessible dialog with backdrop blur
  Drawer.tsx          — mobile slide-in panel
  Avatar.tsx          — image with initials fallback
  Skeleton.tsx        — loading placeholder
  Tag.tsx             — pill label
  Divider.tsx         — subtle horizontal rule with optional label
  LanguageToggle.tsx  — EN / RU switcher

/components/layout/
  Navbar.tsx
  Footer.tsx
  PageWrapper.tsx     — wraps pages with AnimatePresence transition
  SectionContainer.tsx — consistent padding + max-width
```

### Button Spec (critical — used everywhere):

```tsx
// Primary CTA — orange, high contrast
<Button variant="primary">Give Now</Button>
// style: bg-[#FF5C1A] text-white rounded-[8px] px-6 py-3 font-semibold hover:bg-[#E0510F] transition

// Secondary CTA — purple ghost
<Button variant="secondary">Learn More</Button>
// style: border border-[#6344FF] text-[#6344FF] bg-transparent hover:bg-[#6344FF10]

// Ghost — minimal
<Button variant="ghost">Watch Sermon</Button>
```

---

## 5. NAVBAR SPECIFICATION

```
Type:         Fixed, full-width, desktop-first
Background:   backdrop-filter: blur(20px) saturate(180%), background: rgba(249,249,249,0.85)
Height:       72px desktop / 64px mobile
Border:       1px solid rgba(232,232,236,0.8) on scroll (invisible at top)
Logo:         Left — wordmark "ECCLESIA" in Manrope 700 + small "MOSCOW" subscript in 400
Nav Links:    Center — Home, Vision, Leadership, Ministries (dropdown), Global, Store, Events
CTA:          Right — "Give" (orange button) + Language toggle (EN/RU)
Mobile:       Hamburger → full-screen overlay, logo centered, links stacked, large type
Dropdown:     Ministries mega-menu with sub-links: Home Groups, Media, Beliefs & Values
Active state: Thin purple underline (2px), purple text color
```

---

## 6. PAGE-BY-PAGE SPECIFICATIONS

---

### PAGE 1: HOME (/)

**Section 1.1 — Hero**
- Full viewport height (100svh)
- Background: very subtle animated gradient mesh in purple/white tones (CSS only, no JS)
- Large centered heading: "Where Heaven Meets Earth" — Manrope 800, 72px desktop
- Subheading: church tagline — Manrope 300, 20px, color: --text-secondary
- Two CTAs: "Plan Your Visit" (orange) + "Watch This Week's Sermon" (ghost)
- Scroll indicator: animated chevron-down, fades out on scroll
- NO stock photos in hero — pure typographic + abstract visual treatment

**Section 1.2 — Welcome Statement**
- White background section
- Eyebrow: "OUR HEART" in purple, small caps, letter-spacing wide
- Large pull-quote from lead apostle — Manrope 300 italic, 32px
- Attribution line: name + title
- Right side: abstract geometric accent (CSS-drawn, purple tones)

**Section 1.3 — Movement Stats**
- Background: --color-surface-subtle (#f2f2f4)
- 4 animated counter cards: Years / Locations / Nations Reached / Weekly Gatherings
- Count-up animation triggered on scroll into view
- Purple number, muted label below

**Section 1.4 — Vision Snapshot (Matthew 9:37-38)**
- Full-width section, dark background (#0d0d10)
- Scripture quote prominently displayed — Manrope 300, large, centered, white
- Reference in orange
- Brief vision paragraph below in muted text
- CTA: "Read Our Full Vision" → /vision

**Section 1.5 — Service Times**
- Clean 3-column card layout (Sunday Morning / Sunday Evening / Midweek)
- Card: white, 8px radius, subtle shadow, border
- Icon (Lucide Clock) + Day + Time + Language (English / Russian)
- "Get Directions" link in purple

**Section 1.6 — Latest Sermons (3 cards)**
- Horizontal scroll on mobile, 3-column grid on desktop
- Each card: thumbnail (16:9), series badge, title, speaker, date, duration
- Purple play button overlay on hover
- CTA: "Visit Media Library" → /media

**Section 1.7 — Upcoming Events (3 cards)**
- Date chip (orange), event name, location, brief description
- Hover: card lifts, border goes purple
- CTA: "View Full Calendar" → /events

**Section 1.8 — Ministries Grid**
- 3×2 grid of ministry cards (or 2×3 on tablet)
- Each: icon (Lucide), title, one-line description, "Learn More" link
- Ministries: Home Groups · Youth · Worship · Outreach · Prayer · Media
- Subtle hover: purple left-border accent appears

**Section 1.9 — Global Reach Teaser**
- Dark section with an inline world map (static SVG or Mapbox embed)
- Dots/pins on each global location
- CTA: "See All Locations" → /global

**Section 1.10 — Testimonials**
- Auto-rotating carousel (pause on hover)
- 5 member testimonials: avatar, name, city/country, quote
- Purple accent quotation mark

**Section 1.11 — Newsletter / Connection Card**
- Light purple background tint (#6344FF10)
- Heading: "Stay Connected to the Movement"
- Email + name input, Zod-validated
- Privacy note, submit → Resend API route

---

### PAGE 2: VISION & MISSION (/vision)

- Hero: full-width typographic, Matthew 9:37-38 as the opening anchor
- The Harvest Mandate: rich text editorial layout
- Three pillars: Spirit-led / Mission-conscious / Kingdom-minded — icon + heading + 3 paragraphs each
- Timeline or values grid section
- CTA section: "Join the Movement" → /giving and /volunteering

---

### PAGE 3: LEADERSHIP (/leadership)

**Tier 1 — Global Apostolic Leadership**
- Featured layout: large photo, name, title, bio excerpt, social links
- Distinct visual treatment — more editorial, larger type

**Tier 2 — Moscow Executive Team**
- Grid layout: 3 or 4 per row
- Card: photo, name, title, role tag
- Click → modal with full bio

---

### PAGE 4: HOME GROUPS (/home-groups)

- Hero: "Find Your People"
- Search/filter bar: by day / area / language
- Group cards: name, meeting day, area, leader name, capacity indicator
- Click group card → /home-groups/[slug] detail page
- Detail page: full description, leader bio, meeting address, how to join form

---

### PAGE 5: MEDIA LIBRARY (/media)

- Filter tabs: All / Video / Audio / Series
- Search bar (client-side filter)
- Grid of sermon cards: thumbnail, title, speaker, date, duration, series tag
- Click → sermon detail page with embedded video/audio player
- Series page: /media/series/[slug]
- Pagination or infinite scroll

---

### PAGE 6: BELIEFS & VALUES (/beliefs)

- Clean editorial layout
- Sections for: The Bible, The Trinity, Salvation, The Holy Spirit, The Church, Eschatology
- Each: heading + rich body text
- Anchor navigation sidebar on desktop

---

### PAGE 7: GIVING (/giving)

- Ultra-modern, trust-first design
- Eyebrow: "Financial Partnership"
- Heading: "Fuel the Harvest"
- Brief generosity scripture + paragraph
- Giving options: One-time / Monthly — toggle switch
- Amount selector: preset amounts (500₽ / 1000₽ / 5000₽ / Custom) — orange active state
- "Give Securely" button → links to verified external giving platform (Tithe.ly / Pushpay)
- DO NOT collect payment on-site under any circumstances
- Trust badges: "Secure" / "Registered Organization" / "Transparent Finances"
- FAQ accordion: "Is my gift tax-deductible?" etc.

---

### PAGE 8: VOLUNTEERING (/volunteering)

- Hero: "Serve the City"
- Opportunity cards: role, department, commitment level, skills needed
- Filter by: area / skill / time commitment
- Apply form: name, email, phone, role interest, availability, message
- Zod validation, Resend submission

---

### PAGE 9: OPPORTUNITIES (/opportunities)

- Tabs: Jobs / Internships / Apprenticeships
- Listing cards: role, department, type (full-time/part-time/remote), location
- Click → detail modal or page with full description + apply button
- Apply → form (React Hook Form + Zod) → Resend

---

### PAGE 10: PRAYER REQUEST (/prayer)

- Warm, intimate design — softer section
- Multi-path intake: Prayer Request / Question / Testimony (radio/tab selector)
- Fields change based on path
- Name (optional), email (optional), message (required)
- Toggle: "Keep this private" (default ON)
- Submission confirmation: warm message + scripture
- Resend to internal prayer team email

---

### PAGE 11: GLOBAL LOCATIONS (/global)

- Hero: "One Church. Many Nations."
- Interactive Mapbox map — pins for each location
- Click pin → location card: city, country, lead pastor, service times, contact link
- Sidebar list view: searchable / filterable by region
- CTA: "Plant a Church With Us" → /contact

---

### PAGE 12: ghministriesSTORE (/store)

- Premium e-commerce feel — clean grid, white backgrounds
- Products: books, study guides, apparel, media downloads
- Filter: All / Books / Media / Apparel
- Product card: image, title, author/type, price
- Click → product detail: images, description, "Add to Cart"
- Cart: Zustand store, slide-in drawer
- Checkout: redirect to Stripe-hosted page or Shopify Storefront API
- DO NOT store payment details on-site

---

### PAGE 13: EVENTS CALENDAR (/events)

- Toggle: Calendar View / List View
- Calendar: month view with event dots
- List: event cards with date chip (orange), title, type badge, location, "Register" CTA
- Event detail page: /events/[slug] — full description, speakers, location map, registration form

---

### PAGE 14: CONTACT (/contact)

- Clean, airy layout
- Left column: address (Moscow), phone, email, social links, embedded map
- Right column: contact form — name, email, subject (dropdown), message
- Form → Resend API route → internal team email
- Response time note: "We aim to respond within 2 business days"

---

## 7. FOOTER SPECIFICATION

```
Background:     #0d0d10 (dark)
Logo:           White wordmark + tagline
Columns:        About / Ministries / Global / Connect
Social Icons:   Instagram, YouTube, Telegram, Facebook (Lucide icons, white)
Bottom bar:     © 2025 ghministriesMoscow · Privacy Policy · Terms · Built with Purpose
Language:       EN / RU toggle repeated in footer
Text:           --color-text-tertiary on dark background
Accent line:    1px purple gradient top border
```

---

## 8. ROUTING STRUCTURE

```
app/
  (main)/
    page.tsx                    → / (Home)
    vision/page.tsx             → /vision
    leadership/page.tsx         → /leadership
    home-groups/
      page.tsx                  → /home-groups
      [slug]/page.tsx           → /home-groups/[slug]
    media/
      page.tsx                  → /media
      [slug]/page.tsx           → /media/[slug]
      series/[slug]/page.tsx    → /media/series/[slug]
    beliefs/page.tsx            → /beliefs
    giving/page.tsx             → /giving
    volunteering/page.tsx       → /volunteering
    opportunities/page.tsx      → /opportunities
    prayer/page.tsx             → /prayer
    global/page.tsx             → /global
    store/
      page.tsx                  → /store
      [slug]/page.tsx           → /store/[slug]
    events/
      page.tsx                  → /events
      [slug]/page.tsx           → /events/[slug]
    contact/page.tsx            → /contact
  api/
    contact/route.ts            → POST → Resend
    prayer/route.ts             → POST → Resend
    volunteer/route.ts          → POST → Resend
    newsletter/route.ts         → POST → Resend
```

---

## 9. CODE STANDARDS

```typescript
// TypeScript strict — no `any`
// Functional components + named exports only
// Props typed with interfaces (not type aliases for components)
// Server Components by default; 'use client' only when needed
// No inline styles — Tailwind utility classes only
// All images: next/image with explicit width/height and meaningful alt text
// External links: rel="noopener noreferrer" target="_blank"
// No console.log in production
// Environment variables: never hardcoded, never in client bundle unless prefixed NEXT_PUBLIC_
// API routes: always validate input with Zod before processing
// Error boundaries on all major sections
// Loading skeletons for all async content
```

---

## 10. SECURITY REQUIREMENTS

```
[ ] All API keys in .env.local — never in client code
[ ] .env.example committed to git (no values)
[ ] Resend calls: server-side API routes only (never from client)
[ ] Rate limiting on all API routes: max 5 requests/minute per IP (use upstash/ratelimit)
[ ] Zod validation on ALL form submissions (client AND server-side)
[ ] Input sanitization before email dispatch
[ ] Content Security Policy headers in next.config.js
[ ] Mapbox API key: URL-restricted to your domain only
[ ] No payment processing on-site — external redirect only
[ ] HTTPS enforced (Vercel default)
[ ] No sensitive data in URL params or localStorage
[ ] robots.txt: index all public pages, block /api/*
[ ] sitemap.xml: auto-generated for all static routes
```

---

## 11. PERFORMANCE TARGETS

```
Lighthouse:  95+ Performance / 100 Accessibility / 95+ SEO / 100 Best Practices
Core Web Vitals:
  LCP:  < 1.8s
  FID:  < 50ms
  CLS:  < 0.05
  INP:  < 100ms

Strategy:
  - Static generation (SSG) for all marketing pages
  - ISR (revalidate: 3600) for sermon/event content from CMS
  - next/image for all images — WebP auto-conversion, lazy loading
  - Font: preload Manrope subset, display: swap
  - Framer Motion: dynamic import with ssr: false for heavy animation components
  - No layout shift: reserve image dimensions, skeleton loaders
  - Bundle: analyze with @next/bundle-analyzer, target < 150kB First Load JS
```

---

## 12. INTERNATIONALIZATION (EN / RU)

```
Library: next-intl
Locale files: /messages/en.json + /messages/ru.json
Default locale: en
Routing: /en/... and /ru/... with automatic redirect based on browser preference
All UI strings: extracted to locale files — no hardcoded English in components
Date/number formatting: use Intl.DateTimeFormat and Intl.NumberFormat with locale
Currency: display in both USD and RUB where applicable
```

---

## 13. BUILD ORDER — FOLLOW THIS EXACTLY

Build in this sequence. After each step, pause and confirm before proceeding:

```
PHASE 1 — FOUNDATION
  Step 1:  Scaffold Next.js 14 + TypeScript + Tailwind
  Step 2:  Set up design tokens in globals.css + tailwind.config.ts
  Step 3:  Install and configure all dependencies
  Step 4:  Build all /components/ui/* components
  Step 5:  Build Navbar + Footer
  Step 6:  Build PageWrapper with Framer Motion AnimatePresence

PHASE 2 — HOME PAGE
  Step 7:  Hero section
  Step 8:  Welcome Statement + Movement Stats
  Step 9:  Vision Snapshot (dark section)
  Step 10: Service Times + Latest Sermons + Events
  Step 11: Ministries Grid + Global Teaser + Testimonials + Newsletter

PHASE 3 — CORE PAGES
  Step 12: Vision & Mission page
  Step 13: Leadership page
  Step 14: Beliefs & Values page

PHASE 4 — COMMUNITY PAGES
  Step 15: Home Groups (index + detail)
  Step 16: Media Library (index + sermon detail)
  Step 17: Prayer Request page

PHASE 5 — ENGAGEMENT PAGES
  Step 18: Giving page
  Step 19: Volunteering page
  Step 20: Opportunities page

PHASE 6 — GLOBAL & COMMERCE
  Step 21: Global Locations (with Mapbox)
  Step 22: ghministriesStore (with cart)
  Step 23: Events Calendar

PHASE 7 — FINAL
  Step 24: Contact page
  Step 25: API routes (Resend integrations)
  Step 26: i18n (EN/RU)
  Step 27: SEO: metadata, sitemap, robots.txt
  Step 28: Performance audit + Lighthouse fixes
  Step 29: Security audit + CSP headers
  Step 30: Final review + deployment to Vercel
```

---

## 14. IMPORTANT RULES FOR THE AI AGENT

1. **Ask before building** any section where the design is ambiguous
2. **Request design references** (screenshots, Stitch exports) before building each major page
3. **Suggest improvements** proactively — you are a senior engineer, not just a code monkey
4. **Never use placeholder lorem ipsum** — write real, spiritually resonant placeholder copy that fits the brand
5. **Never use purple gradients on white as a background** — it is cliché; use subtle tints and overlays instead
6. **Never add stock church photography** — use CSS-based abstract visuals, geometric accents, or typography-led design until real assets are provided
7. **Components must be reusable** — if you build something twice, extract it
8. **Mobile is not an afterthought** — test every section at 375px and 768px mentally as you build
9. **This is a real community of real people** — every word, every interaction, must reflect dignity, warmth, and spiritual intentionality
10. **When in doubt, choose restraint** — this brand is minimalist; whitespace is intentional

---

*ghministriesMoscow · Kinetic Sanctity · Built for the Harvest*