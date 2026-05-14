import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'socialLinks',
  title: 'Social Links',
  type: 'object',
  fields: [
    defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
    defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
    defineField({ name: 'telegram', title: 'Telegram', type: 'url' }),
    defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
    defineField({ name: 'twitter', title: 'Twitter/X', type: 'url' }),
  ],
})
