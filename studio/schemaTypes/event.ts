import {defineArrayMember, defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'about', title: 'About'},
    {name: 'quest', title: 'Quest-only modules'},
    {name: 'meta', title: 'Extras & SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required(), group: 'hero'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({name: 'date', title: 'Date', type: 'datetime', validation: (Rule) => Rule.required(), group: 'hero'}),
    defineField({name: 'detail', title: 'Homepage list detail', type: 'text', rows: 2, group: 'hero'}),

    defineField({name: 'kicker', title: 'Kicker', type: 'string', description: 'e.g. "Edition Two · 18–19 September".', group: 'hero'}),
    defineField({name: 'feeLabel', title: 'Fee label', type: 'string', description: 'e.g. "€20 per team".', group: 'hero'}),
    defineField({name: 'heroHeadline', title: 'Hero headline', type: 'string', group: 'hero'}),
    defineField({
      name: 'heroHighlight',
      title: 'Hero headline highlight',
      type: 'string',
      description: 'A substring of the headline to render in the accent colour, e.g. "escape room".',
      group: 'hero',
    }),
    defineField({name: 'subtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'hero'}),
    defineField({name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'}),
    defineField({name: 'registerUrl', title: 'Register URL', type: 'string', group: 'hero'}),
    defineField({name: 'registerCtaLabel', title: 'Register CTA label', type: 'string', initialValue: 'Register your team', group: 'hero'}),
    defineField({name: 'secondaryCta', title: 'Secondary CTA', type: 'link', group: 'hero'}),
    defineField({name: 'countdownEnabled', title: 'Show countdown', type: 'boolean', initialValue: true, group: 'hero'}),

    defineField({name: 'poweredByLabel', title: '"Powered by" label', type: 'string', initialValue: 'Powered by', group: 'about'}),
    defineField({
      name: 'poweredByPartners',
      title: 'Partners',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      group: 'about',
    }),

    defineField({
      name: 'essentials',
      title: 'Essentials',
      type: 'array',
      of: [defineArrayMember({type: 'eventFactCard'})],
      group: 'about',
    }),

    defineField({name: 'aboutEyebrow', title: 'Eyebrow', type: 'string', group: 'about'}),
    defineField({name: 'aboutTitle', title: 'Title', type: 'string', group: 'about'}),
    defineField({name: 'aboutBody', title: 'Body', type: 'array', of: [{type: 'block'}], group: 'about'}),
    defineField({name: 'aboutImage', title: 'Image', type: 'image', options: {hotspot: true}, group: 'about'}),
    defineField({
      name: 'aboutTags',
      title: 'Tags',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      group: 'about',
    }),

    defineField({name: 'stepsHeading', title: 'Heading', type: 'string', initialValue: 'How it works', group: 'about'}),
    defineField({name: 'stepsSubheading', title: 'Subheading', type: 'string', group: 'about'}),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [defineArrayMember({type: 'eventStep'})],
      group: 'about',
    }),

    defineField({name: 'featuredBusinessesHeading', title: '"Featured businesses" heading', type: 'string', group: 'about'}),
    defineField({
      name: 'featuredBusinesses',
      title: 'Featured businesses',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'business'}]})],
      group: 'about',
    }),

    defineField({
      name: 'reasons',
      title: 'Reasons to join',
      type: 'array',
      of: [defineArrayMember({type: 'eventReason'})],
      group: 'about',
    }),

    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [defineArrayMember({type: 'eventFaq'})],
      group: 'about',
    }),

    defineField({name: 'closingMarqueeText', title: 'Closing marquee text', type: 'string', group: 'about'}),

    defineField({
      name: 'practiceCluesEnabled',
      title: 'Show practice clues',
      type: 'boolean',
      initialValue: false,
      group: 'quest',
    }),
    defineField({
      name: 'practiceClues',
      title: 'Practice clues',
      type: 'array',
      of: [defineArrayMember({type: 'eventClue'})],
      group: 'quest',
    }),

    defineField({name: 'prizesHeading', title: '"Prizes" eyebrow', type: 'string', initialValue: 'Prizes confirmed so far', group: 'quest'}),
    defineField({name: 'prizeTally', title: 'Prize tally', type: 'string', description: 'e.g. "€730+".', group: 'quest'}),
    defineField({name: 'prizesIntro', title: 'Prizes intro text', type: 'text', rows: 2, group: 'quest'}),
    defineField({
      name: 'prizes',
      title: 'Prizes',
      type: 'array',
      of: [defineArrayMember({type: 'eventPrize'})],
      group: 'quest',
    }),

    defineField({name: 'trailEnabled', title: 'Show trail map', type: 'boolean', initialValue: false, group: 'quest'}),
    defineField({
      name: 'checkpoints',
      title: 'Checkpoints',
      type: 'array',
      of: [defineArrayMember({type: 'eventCheckpoint'})],
      group: 'quest',
    }),

    defineField({name: 'registrationEnabled', title: 'Show registration calculator', type: 'boolean', initialValue: false, group: 'quest'}),
    defineField({
      name: 'registrationCategories',
      title: 'Registration categories',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'e.g. "Adult teams (18+)", "Teen teams (13–17)".',
      group: 'quest',
    }),
    defineField({name: 'pricePerTeam', title: 'Price per team (€)', type: 'number', group: 'quest'}),
    defineField({name: 'minTeamSize', title: 'Minimum team size', type: 'number', initialValue: 3, group: 'quest'}),
    defineField({name: 'maxTeamSize', title: 'Maximum team size', type: 'number', initialValue: 6, group: 'quest'}),

    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'meta'}),
  ],
  orderings: [
    {name: 'dateAsc', title: 'Date, soonest first', by: [{field: 'date', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', date: 'date'},
    prepare: ({title, date}) => ({title, subtitle: date ? new Date(date).toDateString() : undefined}),
  },
})
