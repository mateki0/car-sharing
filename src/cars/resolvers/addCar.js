const Car = require("./car");

const addCar = async (
  _,
  {
    brand,
    model,
    productionYear,
    engineCapacity,
    enginePower,
    available,
    image,
  }
) => {
  const car = await Car.create({
    brand,
    model,
    productionYear,
    engineCapacity,
    enginePower,
    available,
    image,
  });

  return {
    car,
  };
};

module.exports = addCar;
