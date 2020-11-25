import gql from 'graphql-tag'

export const v1FollowingIndex = gql`
  query v1FollowingIndex($page: Int, $filter: Filter) {
    v1FollowingIndex(page: $page, filter: $filter) {
      edges {
        node {
          id
          user {
            id
            name
            avatar_url
          }
        }
      }
      meta {
        prev_page
        current_page
        next_page
        total_pages
        total_count
      }
    }
  }
`

export const v1FollowerIndex = gql`
  query v1FollowerIndex($page: Int, $filter: Filter) {
    v1FollowerIndex(page: $page, filter: $filter) {
      edges {
        node {
          id
          followable_id
          followable_type
          owner {
            id
            name
            avatar_url
          }
        }
      }
      meta {
        prev_page
        current_page
        next_page
        total_pages
        total_count
      }
    }
  }
`

export const v1FavoriteArticleIndex = gql`
  query v1FavoriteArticleIndex($filter: Filter!, $page: Int) {
    v1FavoriteIndex(filter: $filter, page: $page) {
      edges {
        node {
          id
          article {
            id
            title
            thumb_url
            is_liked
            cached_votes_total
            comments_count
          }
        }
      }
      meta {
        current_page
        prev_page
        next_page
        total_pages
        total_count
      }
    }
  }
`

export const v1FavoriteProductIndex = gql`
  query v1FavoriteProductIndex($filter: Filter!, $page: Int) {
    v1FavoriteIndex(filter: $filter, page: $page) {
      edges {
        node {
          id
          user_id
          favoritable {
            is_reacted
          }
          product {
            id
            name
            image_url
            price
            promotion_price
            utility {
              feature {
                keyword
                id
              }
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
      }
      meta {
        prev_page
        current_page
        next_page
        total_pages
        total_count
      }
    }
  }
`

export const getListPaymentHistory = gql`
  query($filter: Filter!, $page: Int) {
    v1PaymentIndex(filter: $filter, page: $page) {
      edges {
        node {
          id
          user_id
          paymentable_id
          paymentable_type
          price
          status
          created_at
          booking {
            id
            store_id
            store {
              id
              name
              thumb_url
            }
          }
          order {
            id
          }
        }
      }
      meta {
        prev_page
        current_page
        next_page
        total_pages
        total_count
      }
    }
  }
`
