import gql from 'graphql-tag'

export const getListNoti = gql`
  query($page: Int) {
    v1NotificationIndex(page: $page) {
      edges {
        node {
          id
          title
          message
          data
          status
          created_in_word
          sender {
            id
            name
            avatar_url
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

export const v1NotificationDetail = gql`
  query v1NotificationDetail($id: ID!) {
    v1NotificationDetail(id: $id) {
      id
      title
      message
      data
      status
      created_in_word
      sender {
        id
        name
        avatar_url
      }
    }
  }
`
