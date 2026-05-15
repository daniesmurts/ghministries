import { defineType } from 'sanity'

export default defineType({
  name: 'portableTextBody',
  title: 'Portable Text Body',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
              },
            ],
          },
          {
            name: 'scripture',
            type: 'object',
            title: 'Scripture Reference',
            fields: [
              {
                title: 'Reference',
                name: 'reference',
                type: 'string',
                description: 'e.g., Matthew 9:37-38',
              },
              {
                title: 'Version',
                name: 'version',
                type: 'string',
                initialValue: 'NIV',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
        },
      ],
    },
    {
      name: 'callout',
      type: 'object',
      title: 'Callout',
      fields: [
        { name: 'text', type: 'text', title: 'Text' },
        {
          name: 'type',
          type: 'string',
          title: 'Type',
          options: {
            list: [
              { title: 'Info', value: 'info' },
              { title: 'Warning', value: 'warning' },
              { title: 'Success', value: 'success' },
            ],
          },
        },
      ],
    },
    {
      name: 'videoEmbed',
      type: 'object',
      title: 'Video Embed',
      fields: [
        { name: 'url', type: 'url', title: 'Video URL' },
        { name: 'caption', type: 'string', title: 'Caption' },
      ],
    },
  ],
})
