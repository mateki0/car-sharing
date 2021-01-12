const Car = require("../carSchema");

const deleteCar = async (_, { carId }) => {
  const car = await Car.deleteOne({
    _id: carId,
  });
  return {
    id: car._id,
  };
};
module.exports = deleteCar;
