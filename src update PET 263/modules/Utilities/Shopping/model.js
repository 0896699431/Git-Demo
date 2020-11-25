import { pathOr, construct, assocPath } from 'ramda'

function services(record) {
  return {
    edges: pathOr([], ['v1CategoryIndex', 'edges'], record),
    meta: pathOr([], ['v1CategoryIndex', 'meta'], record)
  }
}

function shops(record) {
  return {
    edges: pathOr([], ['v1StoreIndex', 'edges'], record),
    meta: pathOr([], ['v1StoreIndex', 'meta'], record)
  }
}

function products(record) {
  return {
    edges: pathOr([], ['v1ProductIndex', 'edges'], record),
    meta: pathOr([], ['v1ProductIndex', 'meta'], record)
  }
}

function Service(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.services = services(record)
  this.products = products(record)
  this.productDetail = pathOr([], ['v1ProductDetail'], record)
  this.shops = shops(record)
  this.city = pathOr(null, ['city'], record)
  this.district = pathOr(null, ['district'], record)
  this.ward = pathOr(null, ['ward'], record)
}

Service.prototype = {
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  },
  getServices: function() {
    return pathOr([], ['services', 'edges'], this)
  },
  getShops: function() {
    return pathOr([], ['shops', 'edges'], this)
  },
  setCity: function(value) {
    return assocPath(['city'], value, this)
  },
  setDistrict: function(value) {
    return assocPath(['district'], value, this)
  },
  setWard: function(value) {
    return assocPath(['ward'], value, this)
  },
  getProducts: function() {
    return pathOr([], ['products', 'edges'], this)
  }
}

export default construct(Service)
