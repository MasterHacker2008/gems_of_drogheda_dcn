import {defineField, defineType} from 'sanity'

export const personFact = defineType({
  name: 'personFact',
  title: 'Fact',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'value', title: 'Value', type: 'string', validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'value', subtitle: 'label'}},
})

export const personQa = defineType({
  name: 'personQa',
  title: 'Question & answer',
  type: 'object',
  fields: [
    defineField({name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'answer', title: 'Answer', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'question', subtitle: 'answer'}},
})

export const personTimelineEntry = defineType({
  name: 'personTimelineEntry',
  title: 'Timeline entry',
  type: 'object',
  fields: [
    defineField({name: 'year', title: 'Year / label', type: 'string', description: 'e.g. "1994" or "Now".', validation: (Rule) => Rule.required()}),
    defineField({name: 'body', title: 'Body', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'year', subtitle: 'body'}},
})

export const personPlace = defineType({
  name: 'personPlace',
  title: 'Place',
  type: 'object',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'when', title: 'When', type: 'string', description: 'e.g. "Tue–Sat · 10am–5:30pm".', validation: (Rule) => Rule.required()}),
  ],
  preview: {select: {title: 'name', subtitle: 'when'}},
})
