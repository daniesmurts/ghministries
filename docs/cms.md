# GREAT HARVEST MINISTRIES — CMS & ADMIN PANEL MASTER PROMPT
## Sanity Studio · Content Architecture · Editor Experience

---

> This is a STANDALONE prompt. Paste it as the first message in a separate vibe coding session dedicated to the CMS layer. It works in tandem with the main website prompt but is built and deployed independently.

---

## 1. PROJECT CONTEXT

You are building the **content management backend** for **Great Harvest Ministries** — an ultra-modern international church movement. The CMS must be as polished and intentional as the public-facing website. Editors are church staff, ministry leaders, and media team members — many non-technical. The system must be intuitive, fast, and safe.

**CMS Platform:** Sanity.io (v3)
**Studio Route:** Embedded inside the Next.js project at `/studio`
**Public access:** `ghministries.com/studio` — authenticated editors only
**Design language:** Kinetic Sanctity (carry brand colors into Studio customization)

---

## 2. TECH STACK

```
CMS:              Sanity.io v3
Studio:           @sanity/sanity (embedded in Next.js via /app/studio/[[...tool]]/page.tsx)
Client:           @sanity/client + next-sanity
Image handling:   @sanity/image-url + Sanity CDN (automatic WebP, resizing)
Rich text:        Portable Text (@portabletext/react)
Preview:          Sanity Live Preview (draft content visible in Next.js before publishing)
Auth:             Sanity's built-in auth (Google SSO for editors)
Media plugin:     sanity-plugin-media (unified asset management)
Color input:      sanity-plugin-color-input
Internalization:  sanity-plugin-document-internationalization (EN + RU)
Icons:            sanity-plugin-iconify (for icon pickers in schema)
Deployment:       Sanity Studio embedded in Vercel Next.js project
Dataset:          production (live) + staging (for drafts/previews)
```

---

## 3. SANITY PROJECT SETUP

```bash
# Inside your existing Next.js project root:
npx sanity@latest init --env

# Install dependencies:
npm install next-sanity @sanity/image-url @portabletext/react
npm install sanity-plugin-media sanity-plugin-color-input
npm install sanity-plugin-document-internationalization

# File structure additions:
/sanity/
  sanity.config.ts          → Studio configuration
  sanity.cli.ts             → CLI config
  /schemas/
    index.ts                → schema registry (imports all types)
    /documents/             → main content types
    /objects/               → reusable field groups
  /lib/
    client.ts               → Sanity client (read-only, public)
    clientWrite.ts          → Sanity client (write, server-only)
    queries.ts              → all GROQ queries
    image.ts                → image URL builder helper

/app/
  studio/
    [[...tool]]/
      page.tsx              → embedded Studio route
```

---

## 4. SANITY CLIENT CONFIGURATION

```typescript
// /sanity/lib/client.ts
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,              // CDN for public read queries
})

// /sanity/lib/clientWrite.ts — SERVER ONLY, never import in client components
import { createClient } from 'next-sanity'

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN!, // NEVER expose this
})
```

```bash
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_WRITE_TOKEN=your_write_token        # server-only, never NEXT_PUBLIC_
SANITY_WEBHOOK_SECRET=your_webhook_secret       # for on-demand ISR revalidation
SANITY_PREVIEW_SECRET=your_preview_secret       # for draft preview mode
```

---

## 5. STUDIO CONFIGURATION

```typescript
// /sanity/sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { documentInternationalization } from 'sanity-plugin-document-internationalization'
import { structure } from './structure'   // custom sidebar (see Section 7)
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'gh-ministries',
  title: 'Great Harvest Ministries',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  plugins: [
    structureTool({ structure }),         // custom sidebar structure
    visionTool(),                         // GROQ query explorer (dev only)
    media(),                              // unified media library
    documentInternationalization({
      supportedLanguages: [
        { id: 'en', title: 'English' },
        { id: 'ru', title: 'Russian' },
      ],
      schemaTypes: ['sermon', 'event', 'page', 'leader', 'homeGroup'],
    }),
  ],

  schema: { types: schemaTypes },

  // Brand the Studio
  studio: {
    components: {
      // Custom logo in top-left
      logo: () => import('./components/StudioLogo'),
    },
  },

  // Custom theme matching Kinetic Sanctity
  theme: {
    '--brand-primary': '#6344FF',
  },
})
```

---

## 6. CONTENT SCHEMA — ALL DOCUMENT TYPES

Build ALL schemas below. Each schema is a separate file in `/sanity/schemas/documents/`.

---

### 6.1 SERMON

```typescript
// /sanity/schemas/documents/sermon.ts
// Fields:
{
  title: string                    // "Walking in the Spirit"
  slug: slug (from title)
  series: reference → sermonSeries // optional
  speaker: reference → leader
  publishedAt: datetime
  duration: number                 // in minutes
  thumbnail: image (hotspot: true)
  videoUrl: url                    // YouTube / Vimeo embed URL
  audioUrl: url                    // optional podcast/MP3 link
  description: text                // short summary
  body: portableText               // full sermon notes (optional)
  tags: array of strings
  featured: boolean                // shows on homepage
  language: string                 // 'en' | 'ru'
  status: string                   // 'draft' | 'published' | 'archived'
}
```

### 6.2 SERMON SERIES

```typescript
// /sanity/schemas/documents/sermonSeries.ts
{
  title: string                    // "The Book of Acts"
  slug: slug
  description: text
  coverImage: image (hotspot: true)
  startDate: date
  endDate: date                    // optional (ongoing series)
  featured: boolean
}
```

### 6.3 EVENT

```typescript
// /sanity/schemas/documents/event.ts
{
  title: string
  slug: slug
  type: string                     // 'conference' | 'local' | 'online' | 'prayer'
  startDateTime: datetime
  endDateTime: datetime            // optional
  location: object {
    venueName: string
    address: string
    city: string
    country: string
    coordinates: geopoint          // for map pin
    isOnline: boolean
    onlineLink: url
  }
  description: portableText
  coverImage: image (hotspot: true)
  speakers: array of reference → leader
  registrationUrl: url             // external link
  registrationDeadline: datetime
  capacity: number
  isFeatured: boolean
  tags: array of strings
}
```

### 6.4 LEADER

```typescript
// /sanity/schemas/documents/leader.ts
{
  name: string
  slug: slug
  title: string                    // "Lead Apostle" / "Director of Worship"
  tier: string                     // 'global' | 'executive'
  photo: image (hotspot: true)
  shortBio: text                   // 2-3 sentences for card
  fullBio: portableText            // for modal / detail page
  email: email                     // hidden from public
  socialLinks: object {
    instagram: url
    telegram: url
    twitter: url
    facebook: url
  }
  order: number                    // display order
  isActive: boolean
}
```

### 6.5 HOME GROUP

```typescript
// /sanity/schemas/documents/homeGroup.ts
{
  name: string                     // "Grace Group — Arbat"
  slug: slug
  leader: reference → leader
  coLeader: reference → leader     // optional
  meetingDay: string               // 'monday' | 'tuesday' etc.
  meetingTime: string              // "19:00"
  frequency: string                // 'weekly' | 'biweekly'
  language: string                 // 'en' | 'ru' | 'both'
  area: string                     // district / neighbourhood
  address: string                  // shown only after joining
  capacity: number
  currentCount: number
  description: portableText
  photo: image (hotspot: true)
  tags: array of strings           // 'young adults' | 'families' | 'mixed'
  isActive: boolean
  isAcceptingMembers: boolean
}
```

### 6.6 GLOBAL LOCATION

```typescript
// /sanity/schemas/documents/globalLocation.ts
{
  city: string
  country: string
  slug: slug
  region: string                   // 'europe' | 'africa' | 'asia' | 'americas' | 'russia'
  leadPastor: reference → leader
  coordinates: geopoint            // for Mapbox pin
  address: string
  phone: string
  email: email
  website: url
  serviceTimes: array of object {
    day: string
    time: string
    language: string
    type: string                   // 'in-person' | 'online'
  }
  photo: image (hotspot: true)
  established: date
  isActive: boolean
}
```

### 6.7 STORE PRODUCT

```typescript
// /sanity/schemas/documents/storeProduct.ts
{
  title: string
  slug: slug
  category: string                 // 'book' | 'media' | 'apparel' | 'resource'
  author: reference → leader       // optional, for books
  description: portableText
  images: array of image (hotspot: true)
  price: object {
    rub: number
    usd: number
  }
  inStock: boolean
  stockCount: number
  sku: string
  featured: boolean
  tags: array of strings
  externalUrl: url                 // if sold via Shopify
}
```

### 6.8 TESTIMONIAL

```typescript
// /sanity/schemas/documents/testimonial.ts
{
  name: string
  location: string                 // "International" or "Lagos, Nigeria"
  photo: image (hotspot: true)     // optional
  quote: text                      // max 280 chars
  fullStory: portableText          // optional expanded story
  ministry: string                 // which ministry area
  featured: boolean                // shows on homepage carousel
  approved: boolean                // moderation flag
}
```

### 6.9 VOLUNTEER OPPORTUNITY

```typescript
// /sanity/schemas/documents/volunteerOpportunity.ts
{
  title: string                    // "Sound & AV Team"
  slug: slug
  department: string               // 'worship' | 'media' | 'children' | 'hospitality' | 'outreach'
  description: portableText
  commitment: string               // 'weekly' | 'monthly' | 'event-based'
  timeRequired: string             // "2-4 hours/week"
  skills: array of strings
  isOpen: boolean
  applicationEmail: email          // internal routing
}
```

### 6.10 JOB / OPPORTUNITY

```typescript
// /sanity/schemas/documents/jobOpportunity.ts
{
  title: string
  slug: slug
  type: string                     // 'job' | 'internship' | 'apprenticeship'
  department: string
  employmentType: string           // 'full-time' | 'part-time' | 'remote' | 'hybrid'
  location: string
  description: portableText
  requirements: portableText
  benefits: portableText
  salary: string                   // optional, e.g. "Competitive"
  applicationDeadline: date
  applicationEmail: email
  isActive: boolean
}
```

### 6.11 PAGE (Static Content)

```typescript
// /sanity/schemas/documents/page.ts
// For Vision, Beliefs, and other editorial pages managed by editors
{
  title: string
  slug: slug
  seo: object {
    metaTitle: string
    metaDescription: text
    ogImage: image
  }
  body: portableText               // full rich text content
  lastUpdated: datetime
}
```

### 6.12 SITE SETTINGS (Singleton)

```typescript
// /sanity/schemas/documents/siteSettings.ts
// One document — global settings, no slug
{
  churchName: string               // "Great Harvest Ministries"
  tagline: string
  email: email
  phone: string
  address: portableText
  serviceTimes: array of object {
    label: string                  // "Sunday Morning Service"
    day: string
    time: string
    language: string
    type: string
  }
  socialLinks: object {
    instagram: url
    youtube: url
    telegram: url
    facebook: url
  }
  givingUrl: url                   // external giving platform link
  heroHeading: string
  heroSubtext: text
  welcomeQuote: text               // pastor's welcome quote on homepage
  welcomeAuthor: string
  announcementBanner: object {
    isActive: boolean
    message: text
    link: url
    linkLabel: string
  }
  seo: object {
    defaultMetaTitle: string
    defaultMetaDescription: text
    defaultOgImage: image
  }
}
```

### 6.13 PRAYER REQUEST (Write-only from public form)

```typescript
// /sanity/schemas/documents/prayerRequest.ts
// Created via API route from public form — editors can READ but public cannot
{
  type: string                     // 'prayer' | 'question' | 'testimony'
  name: string                     // optional
  email: email                     // optional
  message: text
  isPrivate: boolean
  isRead: boolean                  // for prayer team to mark handled
  submittedAt: datetime
  assignedTo: reference → leader   // prayer team member
}
```

---

## 7. REUSABLE OBJECT SCHEMAS

```typescript
// /sanity/schemas/objects/

portableTextBody.ts    → rich text with marks, links, images, blockquotes, scripture highlights
seoFields.ts           → metaTitle, metaDescription, ogImage (reused across documents)
socialLinks.ts         → instagram, youtube, telegram, facebook, twitter URL fields
serviceTime.ts         → day, time, language, type (reused in settings + locations)
```

### Portable Text Configuration (critical — configure all marks)

```typescript
// portableTextBody.ts — custom marks and block types:
marks: {
  decorators: bold, italic, underline, strike
  annotations: [
    { name: 'link', type: 'object', fields: [url, openInNewTab] },
    { name: 'scripture', type: 'object', fields: [reference, version] },  // highlight scriptures
  ]
}
of: [
  { type: 'image', options: { hotspot: true } },   // inline images
  { type: 'callout', fields: [text, type] },        // styled callout blocks
  { type: 'videoEmbed', fields: [url, caption] },   // embedded video blocks
]
```

---

## 8. CUSTOM STUDIO SIDEBAR STRUCTURE

Organize the Studio sidebar into logical groups that match how church staff think:

```typescript
// /sanity/structure.ts
export const structure = (S) =>
  S.list()
    .title('Great Harvest Ministries')
    .items([

      // SINGLETON: Site Settings (one document, always)
      S.listItem()
        .title('⚙️ Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      // CONTENT GROUP
      S.listItem().title('📖 Sermons & Media').child(
        S.list().items([
          S.documentTypeListItem('sermon').title('Sermons'),
          S.documentTypeListItem('sermonSeries').title('Series'),
        ])
      ),

      S.listItem().title('📅 Events').child(
        S.documentTypeListItem('event')
      ),

      S.listItem().title('👥 People').child(
        S.list().items([
          S.documentTypeListItem('leader').title('Leadership'),
          S.documentTypeListItem('testimonial').title('Testimonials'),
        ])
      ),

      S.listItem().title('🏘 Community').child(
        S.list().items([
          S.documentTypeListItem('homeGroup').title('Home Groups'),
          S.documentTypeListItem('globalLocation').title('Global Locations'),
        ])
      ),

      S.listItem().title('🛍 Store').child(
        S.documentTypeListItem('storeProduct')
      ),

      S.divider(),

      // ENGAGEMENT
      S.listItem().title('🙏 Prayer Requests').child(
        S.documentTypeListItem('prayerRequest')
      ),

      S.listItem().title('🤝 Serve & Work').child(
        S.list().items([
          S.documentTypeListItem('volunteerOpportunity').title('Volunteer Roles'),
          S.documentTypeListItem('jobOpportunity').title('Jobs & Internships'),
        ])
      ),

      S.divider(),

      // EDITORIAL
      S.listItem().title('📄 Pages').child(
        S.documentTypeListItem('page')
      ),

    ])
```

---

## 9. GROQ QUERIES (Next.js Data Fetching)

Store all queries in `/sanity/lib/queries.ts`. Import and use in Server Components.

```typescript
// Homepage queries
export const homepageSermonsQuery = groq`
  *[_type == "sermon" && featured == true && status == "published"]
  | order(publishedAt desc)[0...3] {
    _id, title, slug, publishedAt, duration,
    "thumbnail": thumbnail.asset->url,
    "speaker": speaker->{ name, title },
    "series": series->{ title }
  }
`

export const upcomingEventsQuery = groq`
  *[_type == "event" && startDateTime > now()]
  | order(startDateTime asc)[0...3] {
    _id, title, slug, type, startDateTime, location,
    "coverImage": coverImage.asset->url,
    isFeatured
  }
`

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true && approved == true]
  | order(_createdAt desc)[0...5] {
    _id, name, location, quote,
    "photo": photo.asset->url
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    churchName, tagline, email, phone, address,
    serviceTimes, socialLinks, givingUrl,
    heroHeading, heroSubtext, welcomeQuote, welcomeAuthor,
    announcementBanner, seo
  }
`

export const allSermonsQuery = groq`
  *[_type == "sermon" && status == "published"]
  | order(publishedAt desc) {
    _id, title, slug, publishedAt, duration, language, tags,
    "thumbnail": thumbnail.asset->url,
    "speaker": speaker->{ name, title },
    "series": series->{ title, slug }
  }
`

export const sermonBySlugQuery = groq`
  *[_type == "sermon" && slug.current == $slug][0] {
    _id, title, slug, publishedAt, duration, videoUrl, audioUrl,
    description, body, tags, language,
    "thumbnail": thumbnail.asset->url,
    "speaker": speaker->{ name, title, "photo": photo.asset->url },
    "series": series->{ title, slug }
  }
`

export const allEventsQuery = groq`
  *[_type == "event"] | order(startDateTime asc) {
    _id, title, slug, type, startDateTime, endDateTime,
    location, registrationUrl, isFeatured, tags,
    "coverImage": coverImage.asset->url,
    "speakers": speakers[]->{ name, title }
  }
`

export const leadershipQuery = groq`
  *[_type == "leader" && isActive == true] | order(order asc) {
    _id, name, slug, title, tier, shortBio, fullBio, socialLinks,
    "photo": photo.asset->url
  }
`

export const homeGroupsQuery = groq`
  *[_type == "homeGroup" && isActive == true]
  | order(meetingDay asc) {
    _id, name, slug, meetingDay, meetingTime, frequency,
    language, area, capacity, currentCount,
    description, tags, isAcceptingMembers,
    "photo": photo.asset->url,
    "leader": leader->{ name, title, "photo": photo.asset->url }
  }
`

export const globalLocationsQuery = groq`
  *[_type == "globalLocation" && isActive == true]
  | order(country asc) {
    _id, city, country, region, slug, address, phone, email,
    website, serviceTimes, coordinates, established,
    "photo": photo.asset->url,
    "leadPastor": leadPastor->{ name, title, "photo": photo.asset->url }
  }
`

export const storeProductsQuery = groq`
  *[_type == "storeProduct"] | order(_createdAt desc) {
    _id, title, slug, category, price, inStock, featured, tags,
    "images": images[].asset->url,
    "author": author->{ name }
  }
`

export const openVolunteerOpportunitiesQuery = groq`
  *[_type == "volunteerOpportunity" && isOpen == true]
  | order(department asc) {
    _id, title, slug, department, commitment, timeRequired,
    skills, description
  }
`

export const activeJobsQuery = groq`
  *[_type == "jobOpportunity" && isActive == true]
  | order(type asc) {
    _id, title, slug, type, department, employmentType,
    location, salary, applicationDeadline, description
  }
`
```

---

## 10. NEXT.JS DATA FETCHING PATTERN

Use Server Components with fetch caching + on-demand ISR revalidation via webhooks.

```typescript
// Example: /app/(main)/media/page.tsx
import { client } from '@/sanity/lib/client'
import { allSermonsQuery } from '@/sanity/lib/queries'

export const revalidate = 3600  // ISR: revalidate every hour

export default async function MediaPage() {
  const sermons = await client.fetch(allSermonsQuery)
  return <MediaLibrary sermons={sermons} />
}
```

```typescript
// Webhook for on-demand revalidation: /app/api/revalidate/route.ts
// Triggered by Sanity when content is published
import { revalidatePath } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: Request) {
  const { isValidSignature, body } = await parseBody(req, process.env.SANITY_WEBHOOK_SECRET)
  if (!isValidSignature) return new Response('Unauthorized', { status: 401 })

  // Revalidate relevant paths based on document type
  const type = body._type
  if (type === 'sermon') revalidatePath('/media')
  if (type === 'event') revalidatePath('/events')
  if (type === 'leader') revalidatePath('/leadership')
  if (type === 'homeGroup') revalidatePath('/home-groups')
  if (type === 'siteSettings') revalidatePath('/')
  // ... etc

  return new Response('Revalidated', { status: 200 })
}
```

---

## 11. LIVE PREVIEW (Draft Content)

Allow editors to preview unpublished content before publishing.

```typescript
// /app/api/draft/route.ts — enable draft mode
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  draftMode().enable()
  redirect(slug ?? '/')
}

// In Server Components: check draftMode().isEnabled
// If true, use useCdn: false + token to fetch drafts
```

---

## 12. IMAGE HANDLING

```typescript
// /sanity/lib/image.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Usage in components:
// <img src={urlFor(sermon.thumbnail).width(800).height(450).format('webp').url()} />
// Always use next/image with this as the src for automatic optimization
```

---

## 13. PORTABLE TEXT RENDERING

```typescript
// /components/ui/PortableText.tsx
import { PortableText as SanityPortableText } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

const components = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8 rounded-lg overflow-hidden">
        <Image
          src={urlFor(value).width(800).format('webp').url()}
          alt={value.alt || ''}
          width={800}
          height={450}
          className="w-full object-cover"
        />
      </div>
    ),
    callout: ({ value }: any) => (
      <div className="border-l-4 border-[#6344FF] bg-[#6344FF0D] px-6 py-4 rounded-r-lg my-6">
        <p className="text-[#0d0d10] font-medium">{value.text}</p>
      </div>
    ),
    videoEmbed: ({ value }: any) => (
      <div className="aspect-video rounded-lg overflow-hidden my-8">
        <iframe src={value.url} className="w-full h-full" allowFullScreen />
      </div>
    ),
  },
  marks: {
    link: ({ value, children }: any) => (
      <a href={value.href} target={value.openInNewTab ? '_blank' : '_self'}
         rel="noopener noreferrer" className="text-[#6344FF] underline underline-offset-2">
        {children}
      </a>
    ),
    scripture: ({ value, children }: any) => (
      <span className="italic text-[#6344FF]" title={value.reference}>{children}</span>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold text-[#0d0d10] mt-12 mb-4">{children}</h2>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="text-2xl font-light italic text-[#5a5a6e] border-l-4 border-[#C9A84C] pl-6 my-8">
        {children}
      </blockquote>
    ),
  },
}

export function PortableText({ value }: { value: any }) {
  return <SanityPortableText value={value} components={components} />
}
```

---

## 14. ROLE-BASED ACCESS (Sanity Permissions)

Configure in Sanity Management Dashboard (manage.sanity.io):

```
ROLES TO CREATE:

Administrator
  → Full access to all documents, settings, and Studio configuration

Content Editor
  → Read/write: sermons, events, testimonials, pages, site settings
  → Read-only: prayer requests (cannot delete)
  → No access: API tokens, dataset config

Media Team
  → Read/write: sermons, sermon series, media library only
  → Read-only: events

Events Coordinator
  → Read/write: events only
  → Read-only: leaders (to assign speakers)

Home Groups Pastor
  → Read/write: home groups only
  → Read-only: leaders

Prayer Team
  → Read/write: prayer requests (mark as read, assign)
  → No access: all other documents

Store Manager
  → Read/write: store products only

Global Director
  → Read/write: global locations only
  → Read-only: leaders
```

---

## 15. PRAYER REQUEST INTAKE (Server-side, Secure)

```typescript
// /app/api/prayer/route.ts
// Receives form submission, saves to Sanity AND sends email notification

import { z } from 'zod'
import { writeClient } from '@/sanity/lib/clientWrite'
import { Resend } from 'resend'
import { rateLimit } from '@/lib/rateLimit'   // upstash rate limiter

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  type: z.enum(['prayer', 'question', 'testimony']),
  name: z.string().max(100).optional(),
  email: z.string().email().optional(),
  message: z.string().min(10).max(2000),
  isPrivate: z.boolean().default(true),
})

export async function POST(req: Request) {
  // Rate limit: 3 submissions per hour per IP
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown'
  const { success } = await rateLimit(ip, 3, '1h')
  if (!success) return new Response('Too many requests', { status: 429 })

  const body = await req.json()
  const data = schema.parse(body)   // throws ZodError if invalid

  // Save to Sanity (writeClient — server-only)
  await writeClient.create({
    _type: 'prayerRequest',
    ...data,
    isRead: false,
    submittedAt: new Date().toISOString(),
  })

  // Notify prayer team via Resend
  if (!data.isPrivate) {
    await resend.emails.send({
      from: 'noreply@ghministries.com',
      to: process.env.PRAYER_TEAM_EMAIL!,
      subject: `New ${data.type} — Great Harvest Ministries`,
      text: `Type: ${data.type}\nFrom: ${data.name || 'Anonymous'}\n\n${data.message}`,
    })
  }

  return Response.json({ success: true })
}
```

---

## 16. STUDIO EMBEDDED IN NEXT.JS

```typescript
// /app/studio/[[...tool]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}

// /app/studio/layout.tsx
export const metadata = { title: 'Great Harvest Ministries — Studio' }

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
```

---

## 17. SANITY WEBHOOKS SETUP

Configure in manage.sanity.io → API → Webhooks:

```
Webhook 1: Content Revalidation
  URL:     https://ghministries.com/api/revalidate
  Trigger: Create, Update, Delete
  Filter:  _type in ["sermon","event","leader","homeGroup","siteSettings","testimonial","globalLocation","storeProduct"]
  Secret:  SANITY_WEBHOOK_SECRET (from .env)
  Headers: Content-Type: application/json

Webhook 2: Prayer Request Notification (if using Sanity as source of truth)
  URL:     https://ghministries.com/api/prayer-notify
  Trigger: Create
  Filter:  _type == "prayerRequest"
```

---

## 18. BUILD ORDER FOR THIS PROMPT

```
PHASE 1 — SANITY SETUP
  Step 1:  Initialize Sanity in Next.js project (npx sanity init)
  Step 2:  Configure sanity.config.ts with plugins and theme
  Step 3:  Set up /sanity/lib/client.ts and clientWrite.ts
  Step 4:  Add all environment variables

PHASE 2 — SCHEMAS
  Step 5:  Build all object schemas (portableText, seoFields, etc.)
  Step 6:  Build siteSettings singleton schema
  Step 7:  Build sermon + sermonSeries schemas
  Step 8:  Build event schema
  Step 9:  Build leader schema
  Step 10: Build homeGroup schema
  Step 11: Build globalLocation schema
  Step 12: Build storeProduct schema
  Step 13: Build testimonial schema
  Step 14: Build volunteerOpportunity + jobOpportunity schemas
  Step 15: Build page schema
  Step 16: Build prayerRequest schema
  Step 17: Register all schemas in schemas/index.ts

PHASE 3 — STUDIO CONFIGURATION
  Step 18: Build custom sidebar structure.ts
  Step 19: Add Studio logo component (GH Ministries wordmark)
  Step 20: Configure role-based access in manage.sanity.io
  Step 21: Embed Studio at /app/studio/[[...tool]]/page.tsx
  Step 22: Test Studio — create one sample document of each type

PHASE 4 — DATA LAYER
  Step 23: Write all GROQ queries in queries.ts
  Step 24: Set up image URL builder
  Step 25: Build PortableText renderer component
  Step 26: Set up on-demand revalidation webhook route

PHASE 5 — CONNECT TO FRONTEND
  Step 27: Replace all hardcoded/mock data in Next.js pages with Sanity queries
  Step 28: Connect homepage sections to Sanity data
  Step 29: Connect all other pages
  Step 30: Implement draft mode / live preview

PHASE 6 — API ROUTES
  Step 31: Prayer request intake route (Sanity write + Resend)
  Step 32: Contact form route (Resend only)
  Step 33: Newsletter route (Resend)
  Step 34: Revalidation webhook route

PHASE 7 — FINAL
  Step 35: Configure Sanity webhooks in manage.sanity.io
  Step 36: Set all env vars in Vercel dashboard
  Step 37: Full content audit — populate sample data for every type
  Step 38: Test all editor roles and permissions
  Step 39: Test preview mode
  Step 40: Deploy and smoke test
```

---

## 19. IMPORTANT RULES FOR THE AI AGENT

1. **SANITY_API_WRITE_TOKEN must never appear in client-side code** — only in server-side API routes and `clientWrite.ts`
2. **Never use `useCdn: true` with the write token** — always `false` for mutations
3. **All form submissions go through Next.js API routes** — never call Sanity directly from the browser
4. **Validate with Zod on both client and server** — client for UX, server for security
5. **Use `next/image` for all Sanity images** — never raw `<img>` tags
6. **All GROQ queries must project only the fields needed** — never fetch `...` (everything)
7. **Prayer requests are write-only from the public** — never expose them in public GROQ queries
8. **Rate-limit all public API routes** — use Upstash Redis ratelimit
9. **siteSettings is a singleton** — always documentId: 'siteSettings', never create multiples
10. **Ask before building each schema** — confirm field names and requirements before coding

---

*Great Harvest Ministries · CMS Architecture · Powered by Sanity.io*