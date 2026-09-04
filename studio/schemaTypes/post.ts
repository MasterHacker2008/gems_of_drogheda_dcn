import {defineArrayMember, defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog post',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Used as the card teaser text and as the article page subtitle.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category label',
      type: 'string',
      description: 'Shown as the card eyebrow, e.g. "Quest", "Stories", "Guides".',
    }),
    defineField({name: 'readTimeMinutes', title: 'Read time (minutes)', type: 'number', validation: (Rule) => Rule.min(1)}),
    defineField({name: 'publishedAt', title: 'Published at', type: 'datetime', validation: (Rule) => Rule.required()}),
    defineField({name: 'author', title: 'Author', type: 'reference', to: [{type: 'author'}]}),
    defineField({
      name: 'relatedBusiness',
      title: 'Related business',
      type: 'reference',
      to: [{type: 'business'}],
      description: 'Optional — set this for gem-profile articles to show the "this gem" card, gem badge, and nearby-on-the-trail links. Leave unset for general articles.',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
      description: 'The "Filed under" row on the article page.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        defineArrayMember({type: 'block'}),
        defineArrayMember({type: 'calloutBox'}),
        defineArrayMember({type: 'statGrid'}),
      ],
      description: 'Full post content. Use the Heading 2 / Quote block styles for section headings and pull-quotes, and insert Callout box / Stat grid blocks for the dark riddle-style callouts and fact grids.',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo'}),
  ],
  orderings: [
    {name: 'publishedAtDesc', title: 'Published, newest first', by: [{field: 'publishedAt', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', media: 'mainImage', subtitle: 'category'},
  },
})
