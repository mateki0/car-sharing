const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
