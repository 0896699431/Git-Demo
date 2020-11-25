import gql from 'graphql-tag'

/**
|--------------------------------------------------
| BOOKING
|--------------------------------------------------
*/
export const bookingService = gql`
  mutation v1CreateBooking(
    $note: String
    $booking_at: String
    $utility_id: ID
    $store_id: ID
    $pet_id: ID
    $product_ids: [ID]
  ) {
    v1CreateBooking(
      note: $note
      booking_at: $booking_at
      utility_id: $utility_id
      pet_id: $pet_id
      store_id: $store_id
      product_ids: $product_ids
    ) {
      note
      booking_at
      utility_id
      pet_id
      store_id
      product_ids
    }
  }
`
