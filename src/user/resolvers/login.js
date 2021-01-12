const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const User = require("../userSchema");
const config = require("../../config");

const login = async (_, { email, password }, { res }) => {
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

  if (!isPasswordValid) {
    throw new AuthenticationError("Incorrect password");
  }

  const refreshToken = sign(
    { userId: user.id, count: user.count },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: config.JWT_LIFE_TIME,
    }
  );
  const accessToken = sign({ userId: user.id }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: "15min",
  });

  res.cookie("refresh-token", refreshToken);
  res.cookie("access-token", accessToken);

  return user;
};

module.exports = login;
