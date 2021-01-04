const express = require("express");

const { ApolloServer, gql } = require("apollo-server-express");

const context = require("./utils/context");
const cars = require("./cars");
const user = require("./user");
const {
  isAuthenticatedDirective,
} = require("./user/directives/is-authenticated");

const typeDef = gql`
  type Query
  type Mutation
  directive @isAuthenticated on FIELD_DEFINITION
`;
const server = new ApolloServer({
  typeDefs: [typeDef, cars.typeDef, user.typeDef],
  resolvers: [cars.resolvers, user.resolvers],
  schemaDirectives: {
    authenticated: isAuthenticatedDirective,
  },
  context: async ({ req }) => ({
    user: await context.getUser(req),
  }),
});

const app = express();

server.applyMiddleware({
  path: "/",
  app,
});

module.exports = app;
