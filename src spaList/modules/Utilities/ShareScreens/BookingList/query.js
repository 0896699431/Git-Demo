import gql from 'graphql-tag'

export const getListProduct = gql`
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
            avatar_url
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

export const getListStore = gql`
  query($filter: Filter!, $per_page: Int) {
    v1StoreNearest(filter: $filter, per_page: $per_page) {
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
        }
      }
    }
  }
`
