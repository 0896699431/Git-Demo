import gql from 'graphql-tag'
export const v1ProvinceIndex = gql`
  query v1ProvinceIndex($filter: Filter, $page: Int, $per_page: Int) {
    v1ProvinceIndex(filter: $filter, page: $page, per_page: $per_page) {
      edges {
        node {
          id
          name
          code
          country_id
        }
      }
    }
  }
`
export const v1DistrictIndex = gql`
  query v1DistrictIndex($filter: Filter, $page: Int, $per_page: Int) {
    v1DistrictIndex(filter: $filter, page: $page, per_page: $per_page) {
      edges {
        node {
          id
          name
          code
        }
      }
    }
  }
`
export const v1WardIndex = gql`
  query v1WardIndex($filter: Filter, $page: Int, $per_page: Int) {
    v1WardIndex(filter: $filter, page: $page, per_page: $per_page) {
      edges {
        node {
          id
          name
          code
        }
      }
    }
  }
`
