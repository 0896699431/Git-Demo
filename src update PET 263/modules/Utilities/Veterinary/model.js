import { pathOr, construct } from 'ramda'

function clinics(record) {
  return {
    edges: pathOr([], ['v1NearestStores', 'edges'], record),
    meta: pathOr([], ['v1NearestStores', 'meta'], record)
  }
}

function products(record) {
  return {
    edges: pathOr([], ['v1ProductIndex', 'edges'], record),
    meta: pathOr([], ['v1ProductIndex', 'meta'], record)
  }
}

function Veterinary(record) {
  this.listClinic = clinics(record)
  this.clinicDetail = pathOr({}, ['v1StoreDetail'], record)
  this.clinicProducts = products(record)
}

Veterinary.prototype = {
  getSpaProducts: function() {
    return pathOr([], ['spaProducts', 'edges'], this)
  }
}

export default construct(Veterinary)
