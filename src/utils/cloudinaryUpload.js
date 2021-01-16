const cloudinary = require("cloudinary").v2;
const config = require("../config");
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
});

const processUpload = async (upload) => {
  const { createReadStream } = await upload;
  const stream = createReadStream();
  const cloudinaryUpload = async ({ stream }) => {
    try {
      await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) {
              urls = {
                resultUrl: result.secure_url,
                imagePublicId: result.public_id,
              };
              resultSecureUrl = result.secure_url;
              resolve(urls);
            } else {
              reject(error);
            }
          }
        );
        stream.pipe(streamLoad);
      });
    } catch (err) {
      throw new Error("Failed to upload Image");
    }
  };
  await cloudinaryUpload({ stream });

  return urls;
};
module.exports = processUpload;
