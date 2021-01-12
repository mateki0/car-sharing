const User = require("../userSchema");

const me = async (_, __, { req }) => {
  if (!req.userId) {
    return null;
  }

  return User.findById(req.userId);
};
module.exports = me;
