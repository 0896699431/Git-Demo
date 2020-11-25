import { pathOr, construct } from 'ramda'

function spaProducts(record) {
  return {
    edges: pathOr([], ['v1NearestProduct', 'edges'], record),
    meta: pathOr([], ['v1NearestProduct', 'meta'], record)
  }
}

function Pet(record) {
  this.spaProducts = spaProducts(record)
  this.spaDetail = pathOr([], ['v1ProductDetail'], record)
}

Pet.prototype = {
  getSpaProducts: function() {
    return pathOr([], ['spaProducts', 'edges'], this)
  }
}

export default construct(Pet)
