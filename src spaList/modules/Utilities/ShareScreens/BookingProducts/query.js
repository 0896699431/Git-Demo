import gql from 'graphql-tag'

export const getListProduct = gql`
  query($filter: Filter!, $page: Int) {
    v1ProductIndex(filter: $filter, page: $page) {
      edges {
        node {
          id
          name
          image_url
          utility_id
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
