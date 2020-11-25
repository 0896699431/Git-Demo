import gql from 'graphql-tag'

export const v1KindIndex = gql`
  query($filter: Filter!) {
    v1KindIndex(filter: $filter) {
      edges {
        node {
          id
          name
          avatar_url
        }
      }
    }
  }
`
