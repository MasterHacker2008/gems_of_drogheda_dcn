import {defineArrayMember, defineField, defineType} from 'sanity'

export const businessLocation = defineType({
  name: 'businessLocation',
  title: 'Location',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Tab label',
      type: 'string',
      description: 'Short label for the location picker, e.g. "Saint Laurence St".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'name', title: 'Area name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'address', title: 'Address', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'phone', title: 'Phone (display)', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'tel',
      title: 'Phone (tel: link)',
      type: 'string',
      description: 'e.g. tel:+353419831757',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'openingHours',
      title: 'Opening hours',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'One line per row, e.g. "Mon–Sat, 8:00am – 6:00pm".',
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'address'},
  },
})
