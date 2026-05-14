import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homeGroup',
  title: 'Home Group',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Group Name',
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
      name: 'leader',
      title: 'Leader',
      type: 'reference',
      to: [{ type: 'leader' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coLeader',
      title: 'Co-Leader',
      type: 'reference',
      to: [{ type: 'leader' }],
    }),
    defineField({
      name: 'meetingDay',
      title: 'Meeting Day',
      type: 'string',
      options: {
        list: [
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
          { title: 'Sunday', value: 'sunday' },
        ],
      },
    }),
    defineField({
      name: 'meetingTime',
      title: 'Meeting Time',
      type: 'string',
      description: 'e.g., 19:00',
    }),
    defineField({
      name: 'frequency',
      title: 'Frequency',
      type: 'string',
      options: {
        list: [
          { title: 'Weekly', value: 'weekly' },
          { title: 'Bi-weekly', value: 'biweekly' },
          { title: 'Monthly', value: 'monthly' },
        ],
      },
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'English', value: 'en' },
          { title: 'Russian', value: 'ru' },
          { title: 'Both', value: 'both' },
        ],
      },
    }),
    defineField({
      name: 'area',
      title: 'Area / Neighborhood',
      type: 'string',
      description: 'e.g., Arbat, Moscow',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string',
      description: 'Shown only after joining',
    }),
    defineField({
      name: 'capacity',
      title: 'Capacity',
      type: 'number',
    }),
    defineField({
      name: 'currentCount',
      title: 'Current Member Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableTextBody',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'isAcceptingMembers',
      title: 'Is Accepting New Members?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
