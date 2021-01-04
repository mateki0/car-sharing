const cars = require("./resolvers/cars");
const addCar = require("./resolvers/addCar");
const deleteCar = require("./resolvers/deleteCar");
const uploadImage = require("./resolvers/uploadImage");

const resolvers = {
  Query: {
    cars,
  },
  Mutation: {
    addCar,
    deleteCar,
    uploadImage,
  },
};

module.exports = { resolvers };
