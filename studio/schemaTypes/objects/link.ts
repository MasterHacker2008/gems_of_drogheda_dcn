import {defineField, defineType} from 'sanity'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'href', title: 'URL', type: 'string', validation: (Rule) => Rule.required()}),
  ],
  preview: {
    select: {title: 'label', subtitle: 'href'},
  },
})
