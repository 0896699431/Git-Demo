import gql from 'graphql-tag'

export const v1ForumIndex = gql`
  query v1ForumIndex($filter: Filter!) {
    v1ForumIndex(filter: $filter) {
      edges {
        node {
          id
          name
          forum_type
          image_url
        }
      }
    }
  }
`

export const v1CategoryIndex = gql`
  query v1CategoryIndex($filter: Filter!) {
    v1CategoryIndex(filter: $filter) {
      edges {
        node {
          id
          name
          image_url
          category_type
        }
      }
    }
  }
`
