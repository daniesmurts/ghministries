import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'leader',
  title: 'Leader',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., Lead Apostle / Director of Worship',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          { title: 'Global Apostolic Leadership', value: 'global' },
          { title: 'Moscow Executive Team', value: 'executive' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'shortBio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: '2-3 sentences for cards',
    }),
    defineField({
      name: 'fullBio',
      title: 'Full Bio',
      type: 'portableTextBody',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Hidden from public',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'socialLinks',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
