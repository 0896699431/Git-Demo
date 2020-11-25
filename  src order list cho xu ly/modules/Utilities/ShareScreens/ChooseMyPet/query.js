import gql from 'graphql-tag'

export const getListPet = gql`
  query($filter: Filter!, $per_page: Int) {
    v1PetIndex(filter: $filter, per_page: $per_page) {
      edges {
        node {
          id
          name
          avatar_url
          weight
        }
      }
    }
  }
`

export const updatePet = gql`
  mutation($input: UpdatePetInput!) {
    v1UpdatePet(input: $input) {
      data {
        id
        name
        avatar_url
        weight
      }
    }
  }
`
