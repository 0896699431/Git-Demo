import gql from 'graphql-tag'

export const createVnPayment = gql`
  mutation($input: CreatePaymentInput!) {
    v1CreatePayment(input: $input) {
      data {
        id
        decode_payment_url
      }
    }
  }
`
