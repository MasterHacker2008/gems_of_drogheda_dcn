import {defineField, defineType} from 'sanity'

export const eventFactCard = defineType({
  name: 'eventFactCard',
  title: 'Fact card',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'note', title: 'Note', type: 'string'}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

export const eventStep = defineType({
  name: 'eventStep',
  title: 'Step',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
    defineField({name: 'meta', title: 'Meta tag', type: 'string', description: 'e.g. "Deadline 17 September".'}),
  ],
  preview: {select: {title: 'title', subtitle: 'meta'}},
})

export const eventReason = defineType({
  name: 'eventReason',
  title: 'Reason',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'body'}},
})

export const eventFaq = defineType({
  name: 'eventFaq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({name: 'q', title: 'Question', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'a', title: 'Answer', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'q'}},
})
