import gql from 'graphql-tag'

/**
|--------------------------------------------------
| GET LIST PRODUCT
|--------------------------------------------------
*/

export const createOrder = gql`
  mutation($input: CreateOrdersInput!) {
    v1CreateOrders(input: $input) {
      data {
        id
      }
    }
  }
`
