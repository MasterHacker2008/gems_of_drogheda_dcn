import {author} from './author'
import {blogSettings} from './blogSettings'
import {business} from './business'
import {category} from './category'
import {directorySettings} from './directorySettings'
import {event} from './event'
import {homePage} from './homePage'
import {businessLocation} from './objects/businessLocation'
import {calloutBox} from './objects/calloutBox'
import {eventFactCard, eventFaq, eventReason, eventStep} from './objects/eventCards'
import {eventCheckpoint, eventClue, eventPrize} from './objects/eventQuestModules'
import {link} from './objects/link'
import {sellItem} from './objects/sellItem'
import {seo} from './objects/seo'
import {statGrid} from './objects/statGrid'
import {post} from './post'
import {siteSettings} from './siteSettings'

export const schemaTypes = [
  // objects
  seo,
  link,
  businessLocation,
  sellItem,
  calloutBox,
  statGrid,
  eventFactCard,
  eventStep,
  eventReason,
  eventFaq,
  eventClue,
  eventCheckpoint,
  eventPrize,
  // singletons
  siteSettings,
  homePage,
  blogSettings,
  directorySettings,
  // collections
  category,
  event,
  author,
  post,
  business,
]
