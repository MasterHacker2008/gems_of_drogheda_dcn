import {defineArrayMember, defineField, defineType} from 'sanity'

export const statGrid = defineType({
  name: 'statGrid',
  title: 'Stat grid',
  type: 'object',
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
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
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {stats: 'stats'},
    prepare: ({stats}) => ({title: 'Stat grid', subtitle: stats?.map((s: {value: string}) => s.value).join(' · ')}),
  },
})
