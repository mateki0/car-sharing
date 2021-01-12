const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const WORKERS = process.env.WORKERS;
const JWT_LIFE_TIME = process.env.JWT_LIFE_TIME;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const CLOUD_NAME = process.env.CLOUD_NAME;
const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
module.exports = {
  PORT,
  MONGODB_URI,
  WORKERS,
  JWT_LIFE_TIME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  CLOUD_NAME,
  API_KEY,
  API_SECRET,
};
