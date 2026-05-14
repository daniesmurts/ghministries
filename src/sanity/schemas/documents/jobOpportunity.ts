import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'jobOpportunity',
  title: 'Job / Internship',
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
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Job', value: 'job' },
          { title: 'Internship', value: 'internship' },
          { title: 'Apprenticeship', value: 'apprenticeship' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'department',
      title: 'Department',
      type: 'string',
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Full-time', value: 'full-time' },
          { title: 'Part-time', value: 'part-time' },
          { title: 'Remote', value: 'remote' },
          { title: 'Hybrid', value: 'hybrid' },
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Job Description',
      type: 'portableTextBody',
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'portableTextBody',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'portableTextBody',
    }),
    defineField({
      name: 'salary',
      title: 'Salary Range',
      type: 'string',
      description: 'Optional, e.g. "Competitive"',
    }),
    defineField({
      name: 'applicationDeadline',
      title: 'Application Deadline',
      type: 'date',
    }),
    defineField({
      name: 'applicationEmail',
      title: 'Application Email',
      type: 'string',
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active?',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
