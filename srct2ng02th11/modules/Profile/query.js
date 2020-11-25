import gql from 'graphql-tag'

export const v1UserDetail = gql`
  query v1UserDetail($id: ID!) {
    v1UserDetail(id: $id) {
      id
      name
      avatar_url
      email
      phone
      follows_total
      followers_total
      is_followed
    }
  }
`

export const v1UserProfile = gql`
  query {
    v1UserProfile {
      id
      name
      avatar_url
      email
      phone
    }
  }
`

export const v1PostIndex = gql`
  query v1PostIndex($filter: Filter!, $page: Int, $per_page: Int) {
    v1PostIndex(filter: $filter, page: $page, per_page: $per_page) {
      edges {
        node {
          id
          status
          is_liked
          cached_votes_total
          comments_count
          created_in_word
          user {
            id
          }
          media {
            resolutions {
              url
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
export const v1ArticleIndex = gql`
  query v1ArticleIndex($filter: Filter!, $page: Int) {
    v1ArticleIndex(filter: $filter, page: $page) {
      edges {
        node {
          id
          title
          thumb_url
          created_in_word
          cached_votes_total
          comments_count
          user {
            id
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

export const v1PetIndex = gql`
  query($filter: Filter!, $page: Int) {
    v1PetIndex(filter: $filter, page: $page) {
      edges {
        node {
          id
          name
          avatar_url
          breed_id
          kind_id
          birthday
          user {
            id
          }
          kind {
            name
          }
          breed {
            name
          }
        }
      }
    }
  }
`

// ADD ADDRESS
export const v1CreateReceiverAddress = gql`
  mutation($input: CreateReceiverAddressInput!) {
    v1CreateReceiverAddress(input: $input) {
      data {
        id
      }
    }
  }
`
//Delete address
export const v1DeleteReceiverAddress = gql`
  mutation($input: DeleteReceiverAddressInput!) {
    v1DeleteReceiverAddress(input: $input) {
      data {
        id
      }
    }
  }
`

//Update address
export const v1UpdateReceiverAddress = gql`
  mutation($input: UpdateReceiverAddressInput!) {
    v1UpdateReceiverAddress(input: $input) {
      data {
        id
      }
    }
  }
`

export const v1UpdateProfile = gql`
  mutation($input: UpdateProfileInput!) {
    v1UpdateProfile(input: $input) {
      data {
        id
        name
        avatar_url
        phone
        follows_total
        followers_total
        is_followed
      }
    }
  }
`
