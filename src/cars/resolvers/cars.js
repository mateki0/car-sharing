const Car = require("../carSchema");

const cars = async (_, {}) => {
  const cars = await Car.find({}, (err, cars) => {
    if (err) {
      console.log(err);
    }
    return cars;
  });
  console.log(cars);
  return cars;
};
module.exports = cars;
