import gql from 'graphql-tag'

export const v1ArticleIndex = gql`
  query($filter: Filter!, $per_page: Int) {
    v1ArticleIndex(filter: $filter, per_page: $per_page) {
      edges {
        node {
          id
          forum_id
          title
          thumb_url
          user {
            id
            name
            avatar_url
          }
          forum {
            id
            name
            image_url
          }
          category {
            id
            name
          }
        }
      }
    }
  }
`
