import gql from 'graphql-tag'

export const v1CreateSetting = gql`
  mutation v1CreateSetting($input: CreateSettingInput!) {
    v1CreateSetting(input: $input) {
      data {
        address
        latitude
        longitude
        bound
        description
        gender
        pet_settings {
          id
          status
          pet {
            id
            name
            avatar_url
            images {
              id
              url
            }
          }
        }
        kind_settings {
          id
          kind {
            id
            name
            avatar_url
          }
        }
      }
    }
  }
`
export const v1CreateDarling = gql`
  mutation v1CreateDarling($input: CreateDarlingInput!) {
    v1CreateDarling(input: $input) {
      data {
        id
        author_id
        is_matched
        member_pet {
          id
          name
          avatar_url
          user {
            uid
          }
        }
        author_pet {
          id
          name
          avatar_url
          user {
            uid
          }
        }
      }
    }
  }
`

// CREATE ROOM
export const v1CreateRoom = gql`
  mutation v1CreateRoom($input: CreateRoomInput!) {
    v1CreateRoom(input: $input) {
      data {
        id
        owner_id
        user_id
        receiver {
          id
          name
          avatar_url
        }
      }
    }
  }
`

// SEND MESSAGE
export const v1CreateMessage = gql`
  mutation v1CreateMessage($input: CreateMessageInput!) {
    v1CreateMessage(input: $input) {
      data {
        id
        content
      }
    }
  }
`

// UPDATE MESSAGE
export const v1UpdateMessage = gql`
  mutation v1UpdateMessage($input: UpdateMessageInput!) {
    v1UpdateMessage(input: $input) {
      data {
        id
        content
      }
    }
  }
`
//
export const v1DeleteDarling = gql`
  mutation v1DeleteDarling($input: DeleteDarlingInput!) {
    v1DeleteDarling(input: $input) {
      data {
        id
      }
    }
  }
`
