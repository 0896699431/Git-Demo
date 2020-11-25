import gql from 'graphql-tag'

export const getProductListRating = gql`
  query($filter: Filter!, $page: Int) {
    v1ProductRateIndex(filter: $filter, page: $page) {
      edges {
        node {
          id
          ratable_type
          ratable_id
          score
          free_text
          user {
            id
            avatar_url
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

export const getStoreListRating = gql`
  query($filter: Filter!, $page: Int) {
    v1StoreRateIndex(filter: $filter, page: $page) {
      edges {
        node {
          id
          ratable_type
          ratable_id
          score
          free_text
          user {
            id
            avatar_url
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
