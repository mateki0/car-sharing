const cars = require("./resolvers/cars");
const addCar = require("./resolvers/addCar");
const deleteCar = require("./resolvers/deleteCar");

const resolvers = {
  Query: {
    cars,
  },
  Mutation: {
    addCar,
    deleteCar,
  },
};

module.exports = { resolvers };
