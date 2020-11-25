import gql from 'graphql-tag'

export const getBookingDetail = gql`
  query($id: ID!) {
    v1BookingDetail(id: $id) {
      id
      booking_at
      checkout_expect_at
      status
      payment_status
      code
      price
      promotion_price
      paid_money
      weight
      coupon {
        id
        name
        coupon_type
        decrement_value
      }
      booking_items {
        id
        name
        price
        product {
          id
          image_url
        }
      }
      store {
        id
        name
      }
      pet {
        id
        name
        avatar_url
      }
      address {
        id
        address
        latitude
        longitude
      }
    }
  }
`

export const cancelBooking = gql`
  mutation($input: UpdateBookingInput!) {
    v1UpdateBooking(input: $input) {
      data {
        id
      }
    }
  }
`
