const Car = require("../carSchema");
const processDelete = require("../../utils/cloudinaryDelete");
const deleteCar = async (_, { carId, imagePublicId }) => {
  processDelete(imagePublicId);
  const car = await Car.deleteOne({
    _id: carId,
  });
  return car;
};
module.exports = deleteCar;
