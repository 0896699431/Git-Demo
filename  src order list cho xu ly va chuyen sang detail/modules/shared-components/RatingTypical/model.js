import { pathOr, construct } from 'ramda'

function Rating(record) {
  this.productRating = pathOr([], ['v1ProductRateIndex', 'edges'], record)
  this.storeRating = pathOr([], ['v1StoreRateIndex', 'edges'], record)
}

Rating.prototype = {
  getProductRating: function() {
    return pathOr([], ['productRating', 'edges'], this)
  }
}

export default construct(Rating)
