"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionResolver_1 = require("./resolvers/TransactionResolver");
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./schema/schema");
const graphql_scalars_1 = require("graphql-scalars");
const context_1 = require("./context");
const resolvers = {
    Query: {
        transactionList: TransactionResolver_1.TransactionResolvers.transactionList,
        transactionDetails: TransactionResolver_1.TransactionResolvers.transactionDetails,
    },
    Transaction: {
        account: TransactionResolver_1.TransactionResolvers.Account,
        category: TransactionResolver_1.TransactionResolvers.Category,
    },
    DateTime: graphql_scalars_1.DateTimeResolver,
};
const server = new apollo_server_1.ApolloServer({
    resolvers,
    typeDefs: schema_1.typeDefs,
    context: context_1.context,
});
server.listen().then(async ({ url }) => {
    console.log(`🚀 Server ready at: ${url}`);
});
