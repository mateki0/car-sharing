const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcrypt");

const tokenUtil = require("../../../utils/token");
const User = require("../../../models/user");
const config = require("../../../config");

const login = async (_, { email, password }) => {
  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new AuthenticationError("Podany email jest nieprawidłowy");
  }

  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isPasswordValid) {
    throw new AuthenticationError("Nieprawidłowe hasło");
  }

  const token = tokenUtil.create(user._id);

  return {
    user: {
      ...user.doc,
      id: user._id,
    },
    token,
    tokenExpiration: config.JWT_LIFE_TIME,
  };
};

module.exports = login;
