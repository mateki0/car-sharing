const cars = require("./cars");
const addCar = require("./addCar");
const deleteCar = require("./deleteCar");

const resolvers = {
  Query: {
    cars,
  },
  Mutation: {
    addCar,
    deleteCar,
  },
};

module.exports = resolvers;
