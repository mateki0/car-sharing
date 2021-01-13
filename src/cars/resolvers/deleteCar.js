const Car = require("../carSchema");

const deleteCar = async (_, { carId }) => {
  const car = await Car.deleteOne({
    _id: carId,
  });
  return car;
};
module.exports = deleteCar;
