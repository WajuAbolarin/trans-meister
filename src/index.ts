import { TransactionResolvers } from './resolvers/TransactionResolver'
import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema/schema'
import { DateTimeResolver, NegativeFloatResolver, PositiveFloatResolver, UnsignedFloatResolver } from 'graphql-scalars'
import { context } from './context'

const resolvers = {
  Query: {
    transactionList: TransactionResolvers.transactionList,
    transactionDetails: TransactionResolvers.transactionDetails,
  },
  Transaction: {
    account: TransactionResolvers.Account,
    category: TransactionResolvers.Category,
  },
  DateTime: DateTimeResolver,
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context,
})

server.listen().then(async ({ url }) => {
  console.log(`🚀 Server ready at: ${url}`)
})
