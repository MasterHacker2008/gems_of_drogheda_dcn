import type {StructureResolver} from 'sanity/structure'

const SINGLETON_TYPES = new Set(['siteSettings', 'homePage', 'blogSettings', 'directorySettings'])

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .id('homePage')
        .child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem()
        .title('Blog settings')
        .id('blogSettings')
        .child(S.document().schemaType('blogSettings').documentId('blogSettings')),
      S.listItem()
        .title('Directory settings')
        .id('directorySettings')
        .child(S.document().schemaType('directorySettings').documentId('directorySettings')),
      S.listItem()
        .title('Site settings')
        .id('siteSettings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !SINGLETON_TYPES.has(item.getId() as string),
      ),
    ])
