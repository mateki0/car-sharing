const { UserInputError } = require("apollo-server-express");
const bcrypt = require("bcrypt");
const User = require("../../../models/user");

const SALT_ROUNDS = 12;

const signup = async (_, { email, password }) => {
  try {
    const existingUser = await User.findOne({
      email,
    });
    if (existingUser) {
      throw new UserInputError("Ten adres e-mail znajduje się w naszej bazie");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
      email,
      hashedPassword,
    });

    return {
      ...user._doc,
      id: user._id,
      hashedPassword: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = signup;
