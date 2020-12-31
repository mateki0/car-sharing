const { gql } = require("apollo-server-express");

const typeDefs = gql`
  extend type Query {
    cars: [Car]
  }

  extend type Mutation {
    addCar(
      brand: String!
      model: String!
      productionYear: String!
      engineCapacity: String!
      enginePower: String!
      available: Boolean!
    ): Car!
    deleteCar(carID: String!): Car
  }

  type Car {
    brand: String
    model: String
    productionYear: String
    engineCapacity: String
    enginePower: String
    available: Boolean
  }
`;

const resolvers = require("./resolvers");

module.exports = {
  typeDefs: [typeDefs],
  resolvers,
};
