import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'serviceTime',
  title: 'Service Time',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Label', type: 'string', description: 'e.g., Sunday Morning Service' }),
    defineField({
      name: 'day',
      title: 'Day',
      type: 'string',
      options: {
        list: [
          { title: 'Sunday', value: 'sunday' },
          { title: 'Monday', value: 'monday' },
          { title: 'Tuesday', value: 'tuesday' },
          { title: 'Wednesday', value: 'wednesday' },
          { title: 'Thursday', value: 'thursday' },
          { title: 'Friday', value: 'friday' },
          { title: 'Saturday', value: 'saturday' },
        ],
      },
    }),
    defineField({ name: 'time', title: 'Time', type: 'string', description: 'e.g., 10:00' }),
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
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'In-Person', value: 'in-person' },
          { title: 'Online', value: 'online' },
          { title: 'Hybrid', value: 'hybrid' },
        ],
      },
    }),
  ],
})
