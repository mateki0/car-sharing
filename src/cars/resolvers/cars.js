const Car = require("./car");

const cars = async (_, {}) => {
  const cars = await Car.find({}, (err, cars) => {
    return cars;
  });
  return cars;
};
module.exports = cars;
