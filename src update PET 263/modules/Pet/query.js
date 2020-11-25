import gql from 'graphql-tag'

export const getPetDetail = gql`
  query($id: ID!) {
    v1PetDetail(id: $id) {
      id
      name
      description
      avatar_url
      color
      father_breed_id
      mother_breed_id
      father_breed {
        name
      }
      mother_breed {
        name
      }
      breed_id
      kind_id
      birthday
      adoption_date
      gender
      weight
      length
      height
      user {
        id
      }
      kind {
        id
        name
      }
      breed {
        id
        name
        wiki {
          id
        }
      }
    }
  }
`

export const v1KindIndex = gql`
  query v1KindIndex($page: Int, $per_page: Int) {
    v1KindIndex(page: $page, per_page: $per_page) {
      edges {
        node {
          id
          name
          avatar_url
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

export const v1BreedIndex = gql`
  query v1BreedIndex($filter: Filter!, $page: Int, $order_by: String) {
    v1BreedIndex(filter: $filter, page: $page, order_by: $order_by) {
      edges {
        node {
          id
          kind_id
          name
          avatar_url
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

export const createPet = gql`
  mutation($input: CreatePetInput!) {
    v1CreatePet(input: $input) {
      data {
        id
      }
    }
  }
`

export const updatePet = gql`
  mutation($input: UpdatePetInput!) {
    v1UpdatePet(input: $input) {
      data {
        id
      }
    }
  }
`

export const v1DeletePet = gql`
  mutation($input: DeletePetInput!) {
    v1DeletePet(input: $input) {
      data {
        id
      }
    }
  }
`
