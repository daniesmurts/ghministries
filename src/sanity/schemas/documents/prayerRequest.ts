import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'prayerRequest',
  title: 'Prayer Request',
  type: 'document',
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Prayer Request', value: 'prayer' },
          { title: 'Question', value: 'question' },
          { title: 'Testimony', value: 'testimony' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isPrivate',
      title: 'Keep this private',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isRead',
      title: 'Is Handled?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    }),
    defineField({
      name: 'assignedTo',
      title: 'Assigned To',
      type: 'reference',
      to: [{ type: 'leader' }],
      description: 'Prayer team member assigned to this request',
    }),
  ],
})
