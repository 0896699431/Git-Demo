import { pathOr, construct } from 'ramda'

function Coupons(record) {
  this.listCoupon = pathOr([], ['v1AvailableCoupon', 'edges'], record)
}

Coupons.prototype = {
  getListCoupon: function() {
    return pathOr([], ['v1AvailableCoupon', 'edges'], this)
  }
}

export default construct(Coupons)
