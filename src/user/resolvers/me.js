const User = require("../userSchema");

const me = async (_, __, { req }) => {
  console.log("req", req.userId);
  if (!req.userId) {
    return null;
  }

  return User.findById(req.userId);
};
module.exports = me;
