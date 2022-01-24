import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema/schema'
import { context } from './context'

const resolvers = {
  Query: {
    hello: (_: any, { name }: any) => `Hello ${name || 'World'}`,
  },
}

const server = new ApolloServer({
  resolvers,
  typeDefs,
  context,
})

server.listen().then(async ({ url }) => {
  console.log(`🚀 Server ready at: ${url}`)
})
