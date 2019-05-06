//handler.js

const { ApolloServer, gql } = require("apollo-server-lambda");
const { typeDefinitions } = require("./data/schema");
const { resolvers } = require("./data/resolvers");

const typeDefs = gql`
  ${typeDefinitions}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  })
});

exports.graphql = server.createHandler({
  cors: {
    origin: "*",
    credentials: true
  }
});
