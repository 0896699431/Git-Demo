import gql from 'graphql-tag'

export const getRatingDetail = gql`
  query($ratable_id: ID!, $ratable_type: String!) {
    v1MyRating(ratable_id: $ratable_id, ratable_type: $ratable_type) {
      id
      ratable_id
      ratable_type
      score
      free_text
      status
    }
  }
`

export const createRating = gql`
  mutation(
    $ratable_id: ID!
    $freeText: String
    $score: Int
    $ratable_type: String
  ) {
    v1CreateRate(
      ratable_id: $ratable_id
      free_text: $freeText
      score: $score
      ratable_type: $ratable_type
    ) {
      id
    }
  }
`

export const updateRating = gql`
  mutation($id: ID!, $freeText: String, $score: Int, $status: String) {
    v1UpdateRate(
      id: $id
      free_text: $freeText
      score: $score
      status: $status
    ) {
      id
    }
  }
`
