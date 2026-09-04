import {defineField, defineType} from 'sanity'

export const directorySettings = defineType({
  name: 'directorySettings',
  title: 'Directory settings',
  type: 'document',
  groups: [
    {name: 'masthead', title: 'Masthead', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'kicker', title: 'Kicker', type: 'string', initialValue: 'DCN business directory', group: 'masthead'}),
    defineField({name: 'headline', title: 'Headline', type: 'string', group: 'masthead'}),
    defineField({
      name: 'searchPlaceholder',
      title: 'Search placeholder',
      type: 'string',
      initialValue: 'Search by name, street or trade',
      group: 'masthead',
    }),
    defineField({
      name: 'featureCtaLabel',
      title: 'Header "feature your business" CTA label',
      type: 'string',
      description: 'Links to Site settings → Header join CTA link.',
      initialValue: 'Feature your business',
      group: 'masthead',
    }),
    defineField({
      name: 'registerInterestText',
      title: 'Register-interest banner text',
      type: 'text',
      rows: 2,
      group: 'masthead',
    }),
    defineField({
      name: 'registerInterestCtaLabel',
      title: 'Register-interest CTA label',
      type: 'string',
      description: 'Links to Site settings → Header join CTA link.',
      initialValue: 'Register interest',
      group: 'masthead',
    }),
    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    select: {title: 'headline'},
    prepare: ({title}) => ({title: 'Directory settings', subtitle: title}),
  },
})
