import { pathOr, construct } from 'ramda'

function spaProducts(record) {
  return {
    edges: pathOr([], ['v1NearestProduct', 'edges'], record),
    meta: pathOr([], ['v1NearestProduct', 'meta'], record)
  }
}

function Address(record) {
  this.spaProducts = spaProducts(record)
  this.spaDetail = pathOr([], ['v1ProvinceIndex'], record)
}

Address.prototype = {
  getSpaProducts: function() {
    return pathOr([], ['spaProducts', 'edges'], this)
  }
}

export default construct(Address)
