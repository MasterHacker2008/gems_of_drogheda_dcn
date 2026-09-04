import {author} from './author'
import {blogSettings} from './blogSettings'
import {business} from './business'
import {category} from './category'
import {event} from './event'
import {homePage} from './homePage'
import {businessLocation} from './objects/businessLocation'
import {link} from './objects/link'
import {sellItem} from './objects/sellItem'
import {seo} from './objects/seo'
import {post} from './post'
import {siteSettings} from './siteSettings'

export const schemaTypes = [
  // objects
  seo,
  link,
  businessLocation,
  sellItem,
  // singletons
  siteSettings,
  homePage,
  blogSettings,
  // collections
  category,
  event,
  author,
  post,
  business,
]
