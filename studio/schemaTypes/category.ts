import {defineField, defineType} from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'count',
      title: 'Display count',
      type: 'number',
      description: 'Editorial count shown on the category chip, until the business directory drives this automatically.',
      validation: (Rule) => Rule.min(0),
    }),
  ],
  orderings: [
    {name: 'nameAsc', title: 'Name A→Z', by: [{field: 'name', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'name', subtitle: 'count'},
    prepare: ({title, subtitle}) => ({title, subtitle: subtitle ? `${subtitle} businesses` : undefined}),
  },
})
