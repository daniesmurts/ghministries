import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'volunteerOpportunity',
  title: 'Volunteer Opportunity',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., Sound & AV Team',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
      options: {
        list: [
          { title: 'Worship', value: 'worship' },
          { title: 'Media', value: 'media' },
          { title: 'Children', value: 'children' },
          { title: 'Hospitality', value: 'hospitality' },
          { title: 'Outreach', value: 'outreach' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableTextBody',
    }),
    defineField({
      name: 'commitment',
      title: 'Commitment',
      type: 'string',
      options: {
        list: [
          { title: 'Weekly', value: 'weekly' },
          { title: 'Bi-weekly', value: 'biweekly' },
          { title: 'Monthly', value: 'monthly' },
          { title: 'Event-based', value: 'event-based' },
        ],
      },
    }),
    defineField({
      name: 'timeRequired',
      title: 'Time Required',
      type: 'string',
      description: 'e.g., 2-4 hours/week',
    }),
    defineField({
      name: 'skills',
      title: 'Skills Needed',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'isOpen',
      title: 'Is Open?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'applicationEmail',
      title: 'Application Email',
      type: 'string',
      description: 'Internal routing email',
    }),
  ],
})
