const Car = require("../carSchema");

const checkBorrowDate = async (_) => {
  const now = new Date();

  const filter = { borrowedTo: { $lte: now } };
  const update = {
    borrowedTo: "",
    borrowedFrom: "",
    borrowedBy: "",
    available: true,
  };
  const cars = await Car.updateMany(filter, update);

  return cars;
};
module.exports = checkBorrowDate;
