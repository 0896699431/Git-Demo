import gql from 'graphql-tag'

// ADD PRODUCT TO CART
export const v1Follow = gql`
  mutation v1Follow($followable_id: ID, $followable_type: String) {
    v1Follow(followable_id: $followable_id, followable_type: $followable_type) {
      id
      followable {
        reacted_total
        is_reacted
      }
    }
  }
`

export default {
  v1Follow
}
