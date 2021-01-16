const cloudinary = require("cloudinary").v2;
const config = require("../config");

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
});

const processDelete = async (image) => {
  cloudinary.uploader.destroy(image, (err, result) => console.log(result, err));
};

module.exports = processDelete;
