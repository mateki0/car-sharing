const { gql } = require("apollo-server-express");

const typeDef = gql`
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
      image: Upload
      date: String
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
    image: String
    date: String
  }
`;
module.exports = {
  typeDef,
};
