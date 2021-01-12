const me = require("./resolvers/me");
const login = require("./resolvers/login");
const signup = require("./resolvers/signup");
const getUserCars = require("./resolvers/getUserCars");

const resolvers = {
  Query: {
    me,
    getUserCars,
  },
  Mutation: {
    login,
    signup,
  },
};

module.exports = { resolvers };
