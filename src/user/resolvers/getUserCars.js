const Cars = require("../../cars/carSchema");
const getUserCars = async (_, __, { req }) => {
  console.log(req.userId);
  return Cars.find({ owner: req.userId });
};
module.exports = getUserCars;
