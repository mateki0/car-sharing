const Car = require("../carSchema");

const borrowCar = async (_, { id, borrowedBy, borrowedFrom, borrowedTo }) => {
  const filter = { _id: id };
  const update = {
    borrowedBy: borrowedBy,
    available: false,
    borrowedFrom: borrowedFrom,
    borrowedTo: borrowedTo,
  };

  const singleCar = await Car.findOneAndUpdate(filter, update);
  return singleCar;
};
module.exports = borrowCar;
