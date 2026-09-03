import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Falls back to the page title when left blank.',
      validation: (Rule) => Rule.max(60).warning('Longer titles may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated in search results.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Social share image',
      type: 'image',
      description: 'Used for Open Graph / Twitter cards. Recommended 1200×630.',
      options: {hotspot: true},
    }),
  ],
})
