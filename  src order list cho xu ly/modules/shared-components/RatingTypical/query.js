import gql from 'graphql-tag'

export const getProductListRating = gql`
  query($filter: Filter!, $per_page: Int) {
    v1ProductRateIndex(filter: $filter, per_page: $per_page) {
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
    }
  }
`

export const getStoreListRating = gql`
  query($filter: Filter!, $per_page: Int) {
    v1StoreRateIndex(filter: $filter, per_page: $per_page) {
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
    }
  }
`
