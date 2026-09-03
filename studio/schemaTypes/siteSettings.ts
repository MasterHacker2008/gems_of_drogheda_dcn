import {CogIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({name: 'siteTitle', title: 'Site title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({name: 'defaultSeo', title: 'Default SEO', type: 'seo'}),
    defineField({
      name: 'primaryNav',
      title: 'Primary navigation',
      type: 'array',
      of: [defineArrayMember({type: 'link'})],
    }),
    defineField({name: 'joinCtaLabel', title: 'Header join CTA label', type: 'string'}),
    defineField({name: 'joinCtaHref', title: 'Header join CTA link', type: 'string'}),
    defineField({
      name: 'registerUrl',
      title: 'Quest registration URL',
      type: 'string',
      description: 'External registration link (e.g. Actionbound), used by CTAs across the site.',
    }),
    defineField({name: 'footerBlurb', title: 'Footer blurb', type: 'text', rows: 3}),
    defineField({
      name: 'footerColumns',
      title: 'Footer columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({name: 'title', title: 'Column title', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [defineArrayMember({type: 'link'})],
            }),
          ],
          preview: {select: {title: 'title'}},
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({
              name: 'initial',
              title: 'Initials',
              type: 'string',
              description: 'Shown in the round footer badge, e.g. "Fb".',
              validation: (Rule) => Rule.required().max(3),
            }),
            defineField({name: 'href', title: 'URL', type: 'string', validation: (Rule) => Rule.required()}),
          ],
          preview: {select: {title: 'label', subtitle: 'href'}},
        }),
      ],
    }),
    defineField({name: 'copyrightLine', title: 'Copyright line', type: 'string'}),
  ],
  preview: {
    prepare: () => ({title: 'Site settings'}),
  },
})
