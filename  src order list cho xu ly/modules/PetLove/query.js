import gql from 'graphql-tag'

// GET SETTING
export const v1MySettingIndex = gql`
  query v1MySetting {
    v1MySetting {
      address
      latitude
      longitude
      bound
      description
      gender
      status
      pet_settings {
        id
        status
        pet {
          id
          name
          breed {
            name
          }
          avatar_url
          images {
            id
            url
          }
        }
      }
      kind_settings {
        id
        kind {
          id
          name
          avatar_url
        }
      }
    }
  }
`

// GET PET CARD
export const v1PetAvailable = gql`
  query v1PetAvailable($filter: Filter, $page: Int, $per_page: Int) {
    v1PetAvailable(filter: $filter, page: $page, per_page: $per_page) {
      edges {
        node {
          id
          name
          avatar_url
          gender
          description
          breed {
            name
          }
          # setting {
          #   latitude
          #   longitude
          # }
          images {
            id
            url
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

// GET DARLING MATCH LIST
export const v1PetMatching = gql`
  query v1PetMatching($page: Int, $filter: Filter) {
    v1PetMatching(page: $page, filter: $filter) {
      edges {
        node {
          id
          name
          avatar_url
          user {
            uid
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
