const { gql } = require("apollo-server-express");

const typeDef = gql`
  extend type Query {
    me: User @isAuthenticated
  }

  extend type Mutation {
    login(email: String!, password: String!): AuthData
    signup(email: String!, password: String!): User
  }

  type AuthData {
    user: User
    token: String!
    tokenExpiration: String!
  }

  type User {
    id: ID!
    email: String!
    password: String!
  }
`;

module.exports = {
  typeDef,
};
