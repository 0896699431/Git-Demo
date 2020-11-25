import gql from 'graphql-tag'

export const cancelBooking = gql`
  mutation($input: UpdateBookingInput!) {
    v1UpdateBooking(input: $input) {
      data {
        id
      }
    }
  }
`
