import {author} from './author'
import {category} from './category'
import {event} from './event'
import {homePage} from './homePage'
import {link} from './objects/link'
import {seo} from './objects/seo'
import {post} from './post'
import {siteSettings} from './siteSettings'

export const schemaTypes = [
  // objects
  seo,
  link,
  // singletons
  siteSettings,
  homePage,
  // collections
  category,
  event,
  author,
  post,
]
