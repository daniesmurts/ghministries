import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seoFields',
  title: 'SEO Fields',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (Rule) => Rule.max(70).warning('Longer titles may be truncated by search engines'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated by search engines'),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
