const { UserInputError } = require("apollo-server-express");
const Car = require("../../../models/car");

const addCar = async (
  _,
  { brand, module, productionYear, engineCapacity, enginePower }
) => {
  const car = await Car.create({
    brand,
    module,
    productionYear,
    engineCapacity,
    enginePower,
  });

  return {
    car,
  };
};

module.exports = addCar;
