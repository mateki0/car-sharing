const Car = require("../carSchema");

const cars = async (_, {}) => {
  const cars = await Car.find({}, (err, cars) => {
    return cars;
  });
  return cars;
};
module.exports = cars;
