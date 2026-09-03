import {HomeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'categories', title: 'Categories'},
    {name: 'quest', title: 'Quest band'},
    {name: 'events', title: 'Events'},
    {name: 'join', title: 'Join band'},
    {name: 'blog', title: 'Blog'},
    {name: 'marquee', title: 'Marquee'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),

    defineField({name: 'heroKicker', title: 'Kicker', type: 'string', group: 'hero'}),
    defineField({name: 'heroHeading', title: 'Heading', type: 'string', group: 'hero', validation: (Rule) => Rule.required()}),
    defineField({name: 'heroSubheading', title: 'Subheading', type: 'text', rows: 3, group: 'hero'}),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: {hotspot: true},
      group: 'hero',
    }),
    defineField({name: 'heroPrimaryCta', title: 'Primary CTA', type: 'link', group: 'hero'}),
    defineField({name: 'heroSecondaryCta', title: 'Secondary CTA', type: 'link', group: 'hero'}),

    defineField({name: 'showCategories', title: 'Show categories section', type: 'boolean', initialValue: true, group: 'categories'}),
    defineField({name: 'categoriesHeading', title: 'Heading', type: 'string', group: 'categories'}),
    defineField({name: 'categoriesLink', title: '"All categories" link', type: 'link', group: 'categories'}),

    defineField({name: 'questKicker', title: 'Kicker', type: 'string', group: 'quest'}),
    defineField({name: 'questTitle', title: 'Title', type: 'string', group: 'quest'}),
    defineField({name: 'questDescription', title: 'Description', type: 'text', rows: 3, group: 'quest'}),
    defineField({
      name: 'questStats',
      title: 'Stats',
      type: 'array',
      group: 'quest',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'stat',
          fields: [
            defineField({name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        }),
      ],
    }),
    defineField({name: 'questPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'quest'}),
    defineField({name: 'questSecondaryCta', title: 'Secondary CTA ("How it works")', type: 'link', group: 'quest'}),

    defineField({name: 'eventsHeading', title: 'Heading', type: 'string', group: 'events'}),
    defineField({name: 'eventsLink', title: '"Full calendar" link', type: 'link', group: 'events'}),

    defineField({name: 'joinKicker', title: 'Kicker', type: 'string', group: 'join'}),
    defineField({name: 'joinTitle', title: 'Title', type: 'string', group: 'join'}),
    defineField({name: 'joinBody', title: 'Body', type: 'text', rows: 3, group: 'join'}),
    defineField({name: 'joinPrimaryCta', title: 'Primary CTA', type: 'link', group: 'join'}),
    defineField({name: 'joinSecondaryCta', title: 'Secondary CTA', type: 'link', group: 'join'}),
    defineField({
      name: 'joinBenefits',
      title: 'Benefits',
      type: 'array',
      group: 'join',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'benefit',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'body', title: 'Body', type: 'string', validation: (Rule) => Rule.required()}),
          ],
          preview: {select: {title: 'title', subtitle: 'body'}},
        }),
      ],
    }),

    defineField({name: 'blogHeading', title: 'Heading', type: 'string', group: 'blog'}),
    defineField({name: 'blogLink', title: '"All posts" link', type: 'link', group: 'blog'}),

    defineField({
      name: 'marqueeNames',
      title: 'Marquee names',
      description: 'Business names shown scrolling in the ticker band.',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      group: 'marquee',
    }),
  ],
  preview: {
    select: {title: 'heroHeading'},
    prepare: ({title}) => ({title: 'Homepage', subtitle: title}),
  },
})
