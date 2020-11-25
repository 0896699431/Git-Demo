import gql from 'graphql-tag'

export const getListSpaProduct = gql`
  query($filter: Filter!, $page: Int) {
    v1NearestProduct(filter: $filter, page: $page) {
      edges {
        node {
          id
          name
          image_url
          price
          promotion_price
          is_favorited
          utility_id
          average_star
          rates_total
          properties {
            id
            name
            price
            promotion_price
            min_weight
            max_weight
          }
          store {
            id
            name
            addresses {
              id
              address
              latitude
              longitude
            }
          }
        }
      }
      meta {
        prev_page
        current_page
        next_page
        total_count
        total_pages
      }
    }
  }
`

export const getSpaProductDetail = gql`
  query($id: ID!) {
    v1ProductDetail(id: $id) {
      id
      name
      image_url
      description
      price
      promotion_price
      is_favorited
      average_star
      rates_total
      utility_id
      properties {
        id
        name
        price
        promotion_price
        min_weight
        max_weight
      }
      images {
        id
        url
      }
      store {
        id
        name
        avatar_url
        open_at
        close_at
        addresses {
          id
          address
          latitude
          longitude
        }
        partner {
          uid
          name
          avatar_url
        }
      }
    }
  }
`
export const createBooking = gql`
  mutation($input: CreateBookingInput!) {
    v1CreateBooking(input: $input) {
      data {
        id
        booking_type
        price
        promotion_price
      }
    }
  }
`
