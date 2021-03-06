const { gql } = require("apollo-server-express");

const typeDef = gql`
  scalar Upload

  extend type Query {
    cars: [Car]
    getUserCars: [Car]
  }

  extend type Mutation {
    addCar(
      brand: String!
      model: String!
      description: String!
      productionYear: String!
      engineCapacity: String!
      enginePower: String!
      available: Boolean!
      image: Upload!
      imagePublicId: String
      date: String
      owner: String!
    ): Car
    deleteCar(carId: String!, imagePublicId: String!): Car
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
    description: String
    productionYear: String
    engineCapacity: String
    enginePower: String
    available: Boolean
    image: String
    date: String
    owner: String
    borrowedBy: String
    borrowedTo: String
    imagePublicId: String
  }
`;

module.exports = {
  typeDef,
};
