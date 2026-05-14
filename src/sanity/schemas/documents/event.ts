import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Conference', value: 'conference' },
          { title: 'Local Gathering', value: 'local' },
          { title: 'Online Event', value: 'online' },
          { title: 'Prayer Meeting', value: 'prayer' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDateTime',
      title: 'Start Date & Time',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDateTime',
      title: 'End Date & Time',
      type: 'datetime',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({ name: 'venueName', title: 'Venue Name', type: 'string' }),
        defineField({ name: 'address', title: 'Address', type: 'string' }),
        defineField({ name: 'city', title: 'City', type: 'string' }),
        defineField({ name: 'country', title: 'Country', type: 'string' }),
        defineField({ name: 'coordinates', title: 'Coordinates', type: 'geopoint' }),
        defineField({ name: 'isOnline', title: 'Is Online?', type: 'boolean', initialValue: false }),
        defineField({ name: 'onlineLink', title: 'Online Link', type: 'url' }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableTextBody',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'leader' }] }],
    }),
    defineField({
      name: 'registrationUrl',
      title: 'Registration URL',
      type: 'url',
      description: 'External link to registration page',
    }),
    defineField({
      name: 'registrationDeadline',
      title: 'Registration Deadline',
      type: 'datetime',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
  ],
})
