const cars = require("./resolvers/cars");
const addCar = require("./resolvers/addCar");
const deleteCar = require("./resolvers/deleteCar");
const borrowCar = require("./resolvers/borrowCar");
const checkBorrowDate = require("./resolvers/checkBorrowDate");

const resolvers = {
  Query: {
    cars,
  },
  Mutation: {
    addCar,
    deleteCar,
    borrowCar,
    checkBorrowDate,
  },
};

module.exports = { resolvers };
