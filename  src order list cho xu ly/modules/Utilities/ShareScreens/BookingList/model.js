import { pathOr, construct } from 'ramda'

function products(record) {
  return {
    edges: pathOr([], ['v1NearestProduct', 'edges'], record),
    meta: pathOr([], ['v1NearestProduct', 'meta'], record)
  }
}

function BookingList(record) {
  this.bookingProducts = products(record)
  this.stores = pathOr([], ['v1StoreNearest', 'edges'], record)
}

BookingList.prototype = {
  getProducts: function() {
    return pathOr([], ['bookingProducts', 'edges'], this)
  },
  getStores: function() {
    return pathOr([], ['stores', 'edges'], this)
  }
}

export default construct(BookingList)
