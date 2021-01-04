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
      file: Upload
      date: String
    ): Car!
    uploadImage(file: Upload): File
    deleteCar(carID: String!): Car
  }
  type File {
    filename: String!
    mimetype: String!
    path: String!
  }
  type Car {
    brand: String
    model: String
    productionYear: String
    engineCapacity: String
    enginePower: String
    available: Boolean
    file: File
  }
`;
module.exports = {
  typeDef,
};
