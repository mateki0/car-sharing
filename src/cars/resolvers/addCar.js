const Car = require("../carSchema");
const processUpload = require("../../utils/cloudinaryUpload");

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
    owner,
  }
) => {
  const car = await Car.create({
    brand,
    model,
    productionYear,
    engineCapacity,
    enginePower,
    available,
    image: await processUpload(image),
    owner,
  });

  return {
    car,
  };
};

module.exports = addCar;
