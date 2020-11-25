import gql from 'graphql-tag'

export const v1KindIndex = gql`
  query($filter: Filter!) {
    v1KindIndex(filter: $filter) {
      edges {
        node {
          id
          name
          avatar_url
        }
      }
    }
  }
`

export const v1WikiIndex = gql`
  query($filter: Filter!, $page: Int) {
    v1WikiIndex(filter: $filter, page: $page) {
      edges {
        node {
          id
          breed {
            id
            name
            kind_id
          }
          avatar_url
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
export const v1WikiSmart = gql`
  query($filter: Filter!) {
    v1WikiSmart(filter: $filter) {
      edges {
        node {
          id
          breed {
            id
            name
            kind_id
          }
          avatar_url
        }
      }
    }
  }
`

export const getWikiInfo = gql`
  query($id: ID!, $filter: Filter!, $per_page: Int) {
    v1WikiDetail(id: $id) {
      id
      content
      weight
      height
      description
      breed {
        id
        name
        kind {
          id
          name
        }
      }
    }
    v1ImageIndex(filter: $filter, per_page: $per_page) {
      edges {
        node {
          id
          url
          thumb_url
          imageable_id
        }
      }
    }
  }
`

export const getGuides = gql`
  query($filter: Filter!, $page: Int) {
    v1GuideIndex(filter: $filter, page: $page) {
      edges {
        node {
          id
          name
          description
          wiki_id
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
