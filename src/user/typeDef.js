const { gql } = require("apollo-server-express");

const typeDef = gql`
  extend type Query {
    me: User @isAuthenticated
    getUserCars: [Car]
  }

  extend type Mutation {
    login(email: String!, password: String!): LoggedUser
    signup(email: String!, password: String!): User
  }

  type LoggedUser {
    id: ID!
    email: String!
  }

  type User {
    id: ID!
    email: String!
    password: String!
    jwt: String
  }
`;

module.exports = {
  typeDef,
};
