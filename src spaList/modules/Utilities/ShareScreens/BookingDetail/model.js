import { pathOr, construct } from 'ramda'

function BookingDetail(record) {
  this.bookingDetail = pathOr({}, ['v1BookingDetail'], record)
}

BookingDetail.prototype = {
  getBookingDetail: function() {
    return pathOr({}, ['bookingDetail'], this)
  }
}

export default construct(BookingDetail)
