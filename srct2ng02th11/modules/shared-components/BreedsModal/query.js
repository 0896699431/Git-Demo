import gql from 'graphql-tag'

export const v1BreedIndex = gql`
  query v1BreedIndex($filter: Filter!, $page: Int, $order_by: String) {
    v1BreedIndex(filter: $filter, page: $page, order_by: $order_by) {
      edges {
        node {
          id
          avatar_url
          kind_id
          name
        }
      }
      meta {
        prev_page
        current_page
        next_page
        total_pages
        total_count
      }
    }
  }
`
