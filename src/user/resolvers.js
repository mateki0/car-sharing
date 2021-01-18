const me = require("./resolvers/me");
const login = require("./resolvers/login");
const signup = require("./resolvers/signup");

const resolvers = {
  Query: {
    me,
  },
  Mutation: {
    login,
    signup,
  },
};

module.exports = { resolvers };
