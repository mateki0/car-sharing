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
      owner: String!
    ): Car!
    deleteCar(carId: String!): Car
    borrowCar(
      id: String!
      borrowedBy: String!
      borrowedFrom: String!
      borrowedTo: String!
    ): Car
    checkBorrowDate: Car
  }

  type Car {
    id: ID
    brand: String
    model: String
    productionYear: String
    engineCapacity: String
    enginePower: String
    available: Boolean
    image: String
    date: String
    owner: String
    borrowedTo: String
  }
`;
module.exports = {
  typeDef,
};
