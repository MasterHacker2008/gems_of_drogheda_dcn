import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
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
    defineField({name: 'date', title: 'Date', type: 'datetime', validation: (Rule) => Rule.required()}),
    defineField({name: 'detail', title: 'Detail', type: 'text', rows: 2}),
  ],
  orderings: [
    {name: 'dateAsc', title: 'Date, soonest first', by: [{field: 'date', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', date: 'date'},
    prepare: ({title, date}) => ({title, subtitle: date ? new Date(date).toDateString() : undefined}),
  },
})
