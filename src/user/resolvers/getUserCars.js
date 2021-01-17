const Cars = require("../../cars/carSchema");
const getUserCars = async (_, __, { req }) => {
  return Cars.find({
    $or: [{ owner: req.userId }, { borrowedBy: req.userId }],
  });
};
module.exports = getUserCars;
