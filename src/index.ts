import { TransactionResolver } from './resolvers/TransactionResolver'
import 'reflect-metadata'
import * as tq from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { DateTimeResolver } from 'graphql-scalars'
import { context } from './context'
import { GraphQLScalarType } from 'graphql'

const app = async () => {
  const schema = await tq.buildSchema({
    resolvers: [TransactionResolver],
    scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  })

  new ApolloServer({ schema, context: context }).listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at: http://localhost:4000`)
  )
}

app()
