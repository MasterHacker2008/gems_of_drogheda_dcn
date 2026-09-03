import {CogIcon, HomeIcon} from '@sanity/icons'
import type {StructureResolver} from 'sanity/structure'

const SINGLETON_TYPES = new Set(['siteSettings', 'homePage'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .icon(HomeIcon)
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !SINGLETON_TYPES.has(item.getId() as string),
      ),
    ])
