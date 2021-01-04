const Car = require("./car");
const fs = require("fs");
const shortid = require("shortid");
const storeUpload = async ({ stream, filename, mimetype }) => {
  const id = shortid.generate();
  const path = `images/${id}-${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .pipe(fs.createWriteStream(path))
      .on("finish", () => resolve({ path, filename, mimetype }))
      .on("error", reject)
  );
};
const processUpload = async (upload) => {
  const { createReadStream, filename, mimetype } = await upload;
  const stream = createReadStream();
  const file = await storeUpload({ stream, filename, mimetype });
  return file;
};
const addCar = async (
  _,
  { brand, model, productionYear, engineCapacity, enginePower, available, file }
) => {
  console.log(brand);
  console.log("file", file);
  fs.mkdirSync("images", { recursive: true }, (err) => {
    if (err) throw err;
  });
  const image = await processUpload(file);
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
