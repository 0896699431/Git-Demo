import { pathOr, construct, assocPath } from 'ramda'

function services(record) {
  return {
    edges: pathOr([], ['v1UtilityIndex', 'edges'], record),
    meta: pathOr([], ['v1UtilityIndex', 'meta'], record)
  }
}

function shops(record) {
  return {
    edges: pathOr([], ['v1StoreIndex', 'edges'], record),
    meta: pathOr([], ['v1StoreIndex', 'meta'], record)
  }
}

function carts(record) {
  return {
    edges: pathOr([], ['v1CartIndex', 'edges'], record)
  }
}

function productCarts(record) {
  return {
    edges: pathOr([], ['v1CartProductIndex', 'edges'], record),
    meta: pathOr([], ['v1CartProductIndex', 'meta'], record)
  }
}

function vouchers(record) {
  return {
    edges: pathOr([], ['v1CouponIndex', 'edges'], record),
    meta: pathOr([], ['v1CouponIndex', 'meta'], record)
  }
}

function Service(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.services = services(record)
  this.shops = shops(record)
  this.city = pathOr(null, ['city'], record)
  this.district = pathOr(null, ['district'], record)
  this.ward = pathOr(null, ['ward'], record)
  this.carts = carts(record)
  this.productCarts = productCarts(record)
  this.vouchers = vouchers(record)
  this.bookingCart = pathOr({}, ['v1BookingCart'], record)
  this.dayBookings = pathOr({}, ['v1ListDateBooking'], record)
  this.cartProducts = pathOr([], ['v1CartItemIndex', 'edges'], record)
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
  }
}

export default construct(Service)
