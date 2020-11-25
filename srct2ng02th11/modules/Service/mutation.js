import gql from 'graphql-tag'

// REMOVE PRODUCTS IN CART
export const deleteCartItems = gql`
  mutation($input: DeleteCartItemsInput!) {
    v1DeleteCartItems(input: $input) {
      data {
        id
      }
    }
  }
`

// ADD PRODUCT TO CART
export const v1CreateBookingCartProduct = gql`
  mutation($input: CreateBookingCartProductInput!) {
    v1CreateBookingCartProduct(input: $input) {
      data {
        id
      }
    }
  }
`
export const v1UpdateOrder = gql`
  mutation($input: UpdateOrderInput!) {
    v1UpdateOrder(input: $input) {
      data {
        id
      }
    }
  }
`
