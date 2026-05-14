import { groq } from 'next-sanity'

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
