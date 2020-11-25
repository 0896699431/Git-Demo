import gql from 'graphql-tag'

export const getListClinic = gql`
  query($filter: Filter!, $page: Int) {
    v1NearestStores(filter: $filter, page: $page) {
      edges {
        node {
          id
          name
          avatar_url
          open_at
          close_at
          average_star
          addresses {
            id
            address
            latitude
            longitude
          }
          default_utility_store {
            id
            short_description
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

export const getClinicDetail = gql`
  query($id: ID!, $featureId: ID) {
    v1StoreDetail(id: $id, feature_id: $featureId) {
      id
      name
      avatar_url
      thumb_url
      open_at
      close_at
      rates_total
      average_star
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
      images {
        id
        url
      }
      default_utility_store {
        id
        utility_id
        short_description
        description
      }
      veterinarians {
        id
        name
        avatar_url
        specialized
        description
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
      }
    }
  }
`
