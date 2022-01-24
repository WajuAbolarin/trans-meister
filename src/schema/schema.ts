import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    transactionList(startMonth: String, endMonth: String): PaginatedTransactionsResponse!
    transactionDetails(id: ID): Transaction
  }
  type PaginatedTransactionsResponse {
    nodes: [Transaction]!
    connection: Connection!
  }

  type Connection {
    totalCount: Int
  }

  type Transaction {
    id: ID!
    account: Account
    description: String
    category: Category
    reference: String
    currency: String!
    amount: Float
    status: String!
    transactionDate: DateTime!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Account {
    id: ID!
    name: String
  }

  type Category {
    id: ID!
    name: String
  }

  scalar DateTime
`
