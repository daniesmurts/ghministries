import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'globalLocation',
  title: 'Global Location',
  type: 'document',
  fields: [
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.city}-${doc.country}`,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'region',
      title: 'Region',
      type: 'string',
      options: {
        list: [
          { title: 'Europe', value: 'europe' },
          { title: 'Africa', value: 'africa' },
          { title: 'Asia', value: 'asia' },
          { title: 'Americas', value: 'americas' },
          { title: 'Russia/CIS', value: 'russia' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leadPastor',
      title: 'Lead Pastor',
      type: 'reference',
      to: [{ type: 'leader' }],
    }),
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
      description: 'For Mapbox pins',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
    }),
    defineField({
      name: 'serviceTimes',
      title: 'Service Times',
      type: 'array',
      of: [{ type: 'serviceTime' }],
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'established',
      title: 'Date Established',
      type: 'date',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
