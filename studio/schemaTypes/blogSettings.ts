import {defineArrayMember, defineField, defineType} from 'sanity'

export const blogSettings = defineType({
  name: 'blogSettings',
  title: 'Blog settings',
  type: 'document',
  groups: [
    {name: 'masthead', title: 'Masthead', default: true},
    {name: 'sidebar', title: 'Sidebar'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'issueLabel', title: 'Issue label', type: 'string', description: 'e.g. "Issue 14".', group: 'masthead'}),
    defineField({name: 'headline', title: 'Headline', type: 'string', group: 'masthead'}),
    defineField({name: 'intro', title: 'Intro', type: 'text', rows: 3, group: 'masthead'}),
    defineField({name: 'questCountdownEnabled', title: 'Show quest countdown', type: 'boolean', initialValue: true, group: 'masthead'}),
    defineField({
      name: 'questCountdownTargetDate',
      title: 'Quest countdown target date',
      type: 'datetime',
      group: 'masthead',
    }),
    defineField({
      name: 'questCountdownCtaLabel',
      title: 'Countdown CTA label',
      type: 'string',
      description: 'Links to Site settings → Quest registration URL.',
      initialValue: 'Register as a player',
      group: 'masthead',
    }),

    defineField({
      name: 'topicsHeading',
      title: 'Topics heading',
      type: 'string',
      initialValue: 'Topics',
      description: 'The topic list itself is computed live from posts’ category labels, not editable here.',
      group: 'sidebar',
    }),
    defineField({
      name: 'editorsPicksHeading',
      title: '"Most read" tab label',
      type: 'string',
      initialValue: 'Most read',
      group: 'sidebar',
    }),
    defineField({
      name: 'editorsPicks',
      title: 'Editor’s picks',
      description: 'Curated posts shown under the "Most read" tab, since there’s no real analytics to rank by yet.',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: [{type: 'post'}]})],
      group: 'sidebar',
    }),

    defineField({name: 'newsletterTitle', title: 'Newsletter title', type: 'string', group: 'sidebar'}),
    defineField({name: 'newsletterBody', title: 'Newsletter body', type: 'text', rows: 2, group: 'sidebar'}),
    defineField({name: 'newsletterPlaceholder', title: 'Email field placeholder', type: 'string', group: 'sidebar'}),
    defineField({name: 'newsletterCtaLabel', title: 'Newsletter CTA label', type: 'string', group: 'sidebar'}),
    defineField({
      name: 'newsletterUrl',
      title: 'Newsletter signup URL',
      type: 'string',
      description: 'Real external signup link (e.g. Mailchimp/Buttondown) — the CTA links out rather than submitting a form here.',
      group: 'sidebar',
    }),

    defineField({name: 'seo', title: 'SEO', type: 'seo', group: 'seo'}),
  ],
  preview: {
    select: {title: 'headline'},
    prepare: ({title}) => ({title: 'Blog settings', subtitle: title}),
  },
})
