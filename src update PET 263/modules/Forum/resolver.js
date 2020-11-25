import gql from 'graphql-tag'

export const typeDefs = gql`
  extend type Query {
    forum_type: String!
    image_url: String!
    name: String!
    id: String!
  }
`

export const resolvers = {}
