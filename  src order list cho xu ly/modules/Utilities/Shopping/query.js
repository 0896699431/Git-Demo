import gql from 'graphql-tag'

/**
|--------------------------------------------------
| GET LIST PRODUCT
|--------------------------------------------------
*/

export const getListProduct = gql`
  query($page: Int!, $filter: Filter!) {
    v1ProductIndex(page: $page, filter: $filter) {
      edges {
        node {
          id
          name
          image_url
          price
          is_favorited
          utility_id
          properties {
            id
            name
            price
            promotion_price
            min_weight
            max_weight
            quantity
          }
          store {
            id
            name
            addresses {
              id
              address
              latitude
              longitude
            }
          }
        }
      }
      meta {
        prev_page
        current_page
        next_page
        total_count
        total_pages
      }
    }
  }
`

export const getProductDetail = gql`
  query($id: ID!) {
    v1ProductDetail(id: $id) {
      id
      name
      image_url
      description
      price
      is_favorited
      average_star
      utility_id
      properties {
        id
        name
        price
        promotion_price
        min_weight
        max_weight
        quantity
      }
      images {
        id
        url
      }
      store {
        id
        name
        avatar_url
        open_at
        close_at
        addresses {
          id
          address
          latitude
          longitude
        }
        partner {
          uid
          name
          avatar_url
        }
      }
    }
  }
`

/**
|--------------------------------------------------
| GET ADDRESSES
|--------------------------------------------------
*/

export const v1ReceiverAddressIndex = gql`
  query($page: Int!) {
    v1ReceiverAddressIndex(page: $page) {
      edges {
        node {
          id
          province_id
          province {
            id
            name
          }
          district_id
          district {
            id
            name
          }
          ward_id
          ward {
            id
            name
          }
          address
          receiver_name
          receiver_phone
        }
      }
    }
  }
`
