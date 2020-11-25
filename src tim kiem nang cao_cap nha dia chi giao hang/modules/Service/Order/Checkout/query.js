import gql from 'graphql-tag'

export const v1AddressIndex = gql`
  query($page: Int!) {
    v1AddressIndex(page: $page) {
      edges {
        node {
          id
          province_id
          district_id
          ward_id
          address
          receiver_name
          receiver_phone
        }
      }
    }
  }
`
