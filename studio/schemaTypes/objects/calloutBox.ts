import {defineField, defineType} from 'sanity'

export const calloutBox = defineType({
  name: 'calloutBox',
  title: 'Callout box',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string'}),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
      description: 'The large quote or statement, e.g. a pull-quote or a riddle.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'footerText', title: 'Footer text', type: 'string'}),
    defineField({name: 'ctaLabel', title: 'CTA label', type: 'string'}),
    defineField({name: 'ctaHref', title: 'CTA link', type: 'string'}),
  ],
  preview: {
    select: {title: 'text', subtitle: 'eyebrow'},
  },
})
