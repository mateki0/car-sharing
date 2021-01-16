const Cars = require("../../cars/carSchema");
const getUserCars = async (_, __, { req }) => {
  console.log(req.userId);
  return Cars.find({
    $or: [{ owner: req.userId }, { borrowedBy: req.userId }],
  });
};
module.exports = getUserCars;
