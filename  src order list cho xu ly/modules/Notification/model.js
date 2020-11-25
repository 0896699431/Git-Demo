import { pathOr, construct, assocPath } from 'ramda'
import { orEmpty } from 'utils/Selector'

function notiList(record) {
  return {
    edges: pathOr([], ['v1NotificationIndex', 'edges'], record),
    meta: pathOr({}, ['v1NotificationIndex', 'meta'], record)
  }
}

function Notification(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.notiDetail = pathOr({}, ['notiDetail', 'v1NotificationDetail'], record)
  this.notiList = notiList(record)
}

Notification.prototype = {
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  },
  setNotiDetail: function(value) {
    return assocPath(['notiDetail'], value, this)
  }
}

export default construct(Notification)
