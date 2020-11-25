import gql from 'graphql-tag'

// LIST BOOKING
export const getListDayBooking = gql`
  query($filter: Filter!, $per_page: Int!) {
    v1ListDateBooking(filter: $filter, per_page: $per_page) {
      list_dates
      bookings {
        id
        booking_at
        checkout_expect_at
        status
        code
        price
        promotion_price
        score
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
  }
`

export const getShoppingCart = gql`
  query {
    v1CartItemIndex(per_page: 1000) {
      edges {
        node {
          id
          product_id
          quantity
          product {
            id
            name
            image_url
            store {
              id
              name
            }
          }
          property {
            id
            name
            quantity
            price
            promotion_price
          }
        }
      }
    }
  }
`

/**
|--------------------------------------------------
| GET LISTORDER
|--------------------------------------------------
*/

export const getListOrder = gql`
  query($filter: Filter!, $per_page: Int!) {
    v1OrderIndex(filter: $filter, per_page: $per_page) {
      edges {
        node {
          id
          price
          note
          status
          user_id
          receiver_address {
            id
          }
          order_items {
            id
            product {
              name
              image_url
              store {
                name
              }
            }
            property {
              name
              price
            }
            quantity
          }
        }
      }
    }
  }
`

export const v1OrderDetail = gql`
  query($id: ID!) {
    v1OrderDetail(id: $id) {
      id
      user_id
      created_at
      identifier_code
      status
      price
      payment_type
      receiver_address_id
      receiver_address {
        receiver_name
        receiver_phone
        address
        province {
          name
        }
        district {
          name
        }
        ward {
          name
        }
      }
    }
  }
`
