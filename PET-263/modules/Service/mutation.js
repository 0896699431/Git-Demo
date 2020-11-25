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

// export const v1UpdateOrder = gql`
//   mutation v1UpdateOrder(
//     $title: String
//     $content: String
//     $forum_id: ID
//     $category_id: ID
//     $thumb_url: String
//     $id: ID
//   ) {
//     v1UpdateArticle(
//       title: $title
//       content: $content
//       forum_id: $forum_id
//       category_id: $category_id
//       thumb_url: $thumb_url
//       id: $id
//     ) {
//       title
//       thumb_url
//       content
//       forum_id
//       category_id
//       id
//     }
//   }
// `
