import { pathOr, construct } from 'ramda'

function products(record) {
  return {
    edges: pathOr([], ['v1ProductIndex', 'edges'], record),
    meta: pathOr([], ['v1ProductIndex', 'meta'], record)
  }
}

function BookingProduct(record) {
  this.listProducts = products(record)
}

BookingProduct.prototype = {
  getSpaProducts: function() {
    return pathOr([], ['spaProducts', 'edges'], this)
  }
}

export default construct(BookingProduct)
