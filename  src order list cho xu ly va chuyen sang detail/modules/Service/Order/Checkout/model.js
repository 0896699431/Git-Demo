import { pathOr, construct, assocPath } from 'ramda'

function OrderCheckout(record) {
  this.isLoading = pathOr(false, ['isLoading'], record)
  this.listAddress = pathOr([], ['v1AddressIndex', 'edges'], record)
}

OrderCheckout.prototype = {
  setLoading: function(value) {
    return assocPath(['isLoading'], value, this)
  }
}

export default construct(OrderCheckout)
