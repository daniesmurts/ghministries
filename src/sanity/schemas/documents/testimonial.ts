import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'e.g., International or Lagos, Nigeria',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'fullStory',
      title: 'Full Story',
      type: 'portableTextBody',
      description: 'Optional expanded story',
    }),
    defineField({
      name: 'ministry',
      title: 'Ministry Area',
      type: 'string',
      description: 'Which ministry area this testimonial relates to',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'approved',
      title: 'Approved for Public?',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
