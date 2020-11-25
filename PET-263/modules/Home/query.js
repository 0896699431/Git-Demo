import gql from 'graphql-tag'

export const listPetAndKind = gql`
  query($filter: Filter!, $per_page: Int) {
    v1PetIndex(filter: $filter, per_page: $per_page) {
      edges {
        node {
          id
          name
          avatar_url
          weight
          user {
            uid
          }
        }
      }
    }
    v1KindIndex(per_page: $per_page) {
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

export const v1FeatureIndex = gql`
  query($filter: Filter!) {
    v1FeatureIndex(filter: $filter) {
      edges {
        node {
          id
          name
          keyword
          image_url
          position
        }
      }
    }
  }
`
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
