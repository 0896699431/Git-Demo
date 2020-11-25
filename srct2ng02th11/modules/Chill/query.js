import gql from 'graphql-tag'
export const v1PostIndex = gql`
  query v1PostIndex($filter: Filter!, $page: Int) {
    v1PostIndex(filter: $filter, page: $page) {
      edges {
        node {
          id
          status
          is_liked
          cached_votes_total
          comments_count
          created_in_word
          user {
            id
            name
            avatar_url
          }
          media {
            id
            resolutions {
              id
              url
              quality
              width
              height
            }
          }
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
