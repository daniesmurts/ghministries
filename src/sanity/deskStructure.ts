import { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
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
        S.list().id('media').title('Sermons & Media').items([
          S.documentTypeListItem('sermon').title('Sermons'),
          S.documentTypeListItem('sermonSeries').title('Series'),
        ])
      ),

      S.documentTypeListItem('event').title('📅 Events'),

      S.listItem().title('👥 People').child(
        S.list().id('people').title('People').items([
          S.documentTypeListItem('leader').title('Leadership'),
          S.documentTypeListItem('testimonial').title('Testimonials'),
        ])
      ),

      S.listItem().title('🏘 Community').child(
        S.list().id('community').title('Community').items([
          S.documentTypeListItem('homeGroup').title('Home Groups'),
          S.documentTypeListItem('globalLocation').title('Global Locations'),
        ])
      ),

      S.documentTypeListItem('storeProduct').title('🛍 Store'),

      S.divider(),

      // ENGAGEMENT
      S.documentTypeListItem('prayerRequest').title('🙏 Prayer Requests'),

      S.listItem().title('🤝 Serve & Work').child(
        S.list().id('work').title('Serve & Work').items([
          S.documentTypeListItem('volunteerOpportunity').title('Volunteer Roles'),
          S.documentTypeListItem('jobOpportunity').title('Jobs & Internships'),
        ])
      ),

      S.divider(),

      // EDITORIAL
      S.documentTypeListItem('page').title('📄 Pages'),
    ])
