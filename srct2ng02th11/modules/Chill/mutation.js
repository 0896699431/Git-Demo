import gql from 'graphql-tag'

export const v1CreatePost = gql`
  mutation v1CreatePost($status: String!, $media_ids: [ID]!) {
    v1CreatePost(status: $status, content: $media_ids) {
      id
    }
  }
`

export const v1UpdatePost = gql`
  mutation v1UpdatePost($id: ID!, $media_ids: [ID]!, $status: String) {
    v1UpdatePost(id: $id, status: $status, media_ids: $media_ids) {
      is_liked
      id
      status
      user {
        id
        name
      }
      votes {
        id
      }
    }
  }
`

export const v1DeletePost = gql`
  mutation v1DeletePost($id: ID!) {
    v1DeletePost(id: $id) {
      is_liked
      id
      status
      user {
        id
        name
      }
      votes {
        id
      }
    }
  }
`
