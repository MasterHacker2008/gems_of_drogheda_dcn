import {defineField, defineType} from 'sanity'

export const eventClue = defineType({
  name: 'eventClue',
  title: 'Practice clue',
  type: 'object',
  fields: [
    defineField({name: 'tag', title: 'Tag', type: 'string', description: 'e.g. "Clue one".', validation: (Rule) => Rule.required()}),
    defineField({name: 'text', title: 'Clue text', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
    defineField({name: 'answer', title: 'Answer', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'tag', subtitle: 'text'}},
})

export const eventCheckpoint = defineType({
  name: 'eventCheckpoint',
  title: 'Checkpoint',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'body'}},
})

export const eventPrize = defineType({
  name: 'eventPrize',
  title: 'Prize',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Business name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'prize', title: 'Prize', type: 'string', description: 'e.g. "10 × €25 vouchers".', validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'name', subtitle: 'prize'}},
})
