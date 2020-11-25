import gql from 'graphql-tag'

export const getListCoupon = gql`
  query($filter: Filter!) {
    v1AvailableCoupon(filter: $filter) {
      edges {
        node {
          id
          name
          coupon_type
          base_code
          decrement_value
          expired_at
        }
      }
    }
  }
`
