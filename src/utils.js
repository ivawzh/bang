import moment from 'moment'
import { merge } from 'lodash'

export function humanTimestamp():string {
  return moment().format()
}

// MongoDB ObjectID-like timestamp Uuid, e.g 507f1f77bcf86cd799439011
export function timeUuid():string {
  const timestamp = (new Date().getTime() / 1000 | 0).toString(16)
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16)
  }).toLowerCase()
}

// reason we need this instead of using deepmerge lib: https://github.com/KyleAMathews/deepmerge/issues/53
export function immutableMerge(...sources) {
  return merge({}, ...sources)
}
