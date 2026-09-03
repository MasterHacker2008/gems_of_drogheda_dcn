import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'avatar', title: 'Avatar', type: 'image', options: {hotspot: true}}),
  ],
  preview: {
    select: {title: 'name', media: 'avatar'},
  },
})
