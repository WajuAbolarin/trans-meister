import { DateTimeResolver } from 'graphql-scalars'
import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    hello(name: String): String!
  }

  scalar DateTime
`
