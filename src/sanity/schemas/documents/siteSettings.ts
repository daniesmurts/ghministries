import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'churchName',
      title: 'Church Name',
      type: 'string',
      initialValue: 'Great Harvest Ministries',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'General Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'portableTextBody',
    }),
    defineField({
      name: 'serviceTimes',
      title: 'Service Times',
      type: 'array',
      of: [{ type: 'serviceTime' }],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'socialLinks',
    }),
    defineField({
      name: 'givingUrl',
      title: 'Giving URL',
      type: 'url',
      description: 'External giving platform link',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'welcomeQuote',
      title: 'Welcome Quote',
      type: 'text',
      rows: 3,
      description: "Pastor's welcome quote on homepage",
    }),
    defineField({
      name: 'welcomeAuthor',
      title: 'Welcome Quote Author',
      type: 'string',
    }),
    defineField({
      name: 'announcementBanner',
      title: 'Announcement Banner',
      type: 'object',
      fields: [
        defineField({ name: 'isActive', title: 'Is Active?', type: 'boolean', initialValue: false }),
        defineField({ name: 'message', title: 'Message', type: 'text', rows: 2 }),
        defineField({ name: 'link', title: 'Link', type: 'url' }),
        defineField({ name: 'linkLabel', title: 'Link Label', type: 'string' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'seoFields',
    }),
  ],
})
