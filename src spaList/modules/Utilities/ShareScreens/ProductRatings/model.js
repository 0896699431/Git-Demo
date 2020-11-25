import { pathOr, construct } from 'ramda'

function listProductRating(record) {
  return {
    edges: pathOr([], ['v1ProductRateIndex', 'edges'], record),
    meta: pathOr({}, ['v1ProductRateIndex', 'meta'], record)
  }
}

function listStoreRating(record) {
  return {
    edges: pathOr([], ['v1StoreRateIndex', 'edges'], record),
    meta: pathOr({}, ['v1StoreRateIndex', 'meta'], record)
  }
}

function Ratings(record) {
  this.productRatings = listProductRating(record)
  this.storeRatings = listStoreRating(record)
}

Ratings.prototype = {
  getListRating: function() {
    return pathOr([], ['listRating', 'edges'], this)
  }
}

export default construct(Ratings)
