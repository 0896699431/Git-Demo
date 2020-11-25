import gql from 'graphql-tag'

export const v1DeleteNotification = gql`
  mutation v1DeleteNotification($input: DeleteNotificationInput!) {
    v1DeleteNotification(input: $input) {
      data {
        id
      }
    }
  }
`

export const v1UpdateNotification = gql`
  mutation v1UpdateNotification($input: UpdateNotificationInput!) {
    v1UpdateNotification(input: $input) {
      data {
        id
      }
    }
  }
`
