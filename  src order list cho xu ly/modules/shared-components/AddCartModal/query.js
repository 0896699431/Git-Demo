import gql from 'graphql-tag'

export const addCart = gql`
  mutation($input: CreateMultipleCartItemsInput!) {
    v1MultipleCartItems(input: $input) {
      data {
        id
        product_id
        property_id
      }
    }
  }
`
