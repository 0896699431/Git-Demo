import { pathOr, construct } from 'ramda'

function RatingForm(record) {
  this.ratingDetail = pathOr({}, ['v1MyRating'], record)
}

RatingForm.prototype = {
  getRatingDetail: function() {
    return pathOr({}, ['v1MyRating'], this)
  }
}

export default construct(RatingForm)
