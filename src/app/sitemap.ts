import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ghministries.com'
  
  // Static routes
  const routes = [
    '',
    '/vision',
    '/leadership',
    '/home-groups',
    '/media',
    '/beliefs',
    '/giving',
    '/volunteering',
    '/opportunities',
    '/prayer',
    '/global',
    '/store',
    '/events',
    '/contact'
  ]

  // In a real application, you would also fetch dynamic routes 
  // (e.g., all events, home-groups, media) from your CMS/Database here.
  
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.8,
    alternates: {
      languages: {
        en: `${baseUrl}/en${route}`,
        ru: `${baseUrl}/ru${route}`,
      },
    },
  }))
}
