import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'storeProduct',
  title: 'Store Product',
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Book', value: 'book' },
          { title: 'Media', value: 'media' },
          { title: 'Apparel', value: 'apparel' },
          { title: 'Resource', value: 'resource' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'leader' }],
      description: 'Optional, for books/media',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'portableTextBody',
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        defineField({ name: 'rub', title: 'Price (RUB)', type: 'number' }),
        defineField({ name: 'usd', title: 'Price (USD)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock?',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'stockCount',
      title: 'Stock Count',
      type: 'number',
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
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
    defineField({
      name: 'externalUrl',
      title: 'External Store URL',
      type: 'url',
      description: 'If sold via Shopify/External platform',
    }),
  ],
})
