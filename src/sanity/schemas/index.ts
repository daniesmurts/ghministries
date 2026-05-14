import { type SchemaTypeDefinition } from 'sanity'

// Objects
import portableTextBody from './objects/portableTextBody'
import seoFields from './objects/seoFields'
import socialLinks from './objects/socialLinks'
import serviceTime from './objects/serviceTime'

// Documents
import sermon from './documents/sermon'
import sermonSeries from './documents/sermonSeries'
import event from './documents/event'
import leader from './documents/leader'
import homeGroup from './documents/homeGroup'
import globalLocation from './documents/globalLocation'
import storeProduct from './documents/storeProduct'
import testimonial from './documents/testimonial'
import volunteerOpportunity from './documents/volunteerOpportunity'
import jobOpportunity from './documents/jobOpportunity'
import page from './documents/page'
import siteSettings from './documents/siteSettings'
import prayerRequest from './documents/prayerRequest'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects
  portableTextBody,
  seoFields,
  socialLinks,
  serviceTime,

  // Documents
  sermon,
  sermonSeries,
  event,
  leader,
  homeGroup,
  globalLocation,
  storeProduct,
  testimonial,
  volunteerOpportunity,
  jobOpportunity,
  page,
  siteSettings,
  prayerRequest,
]
