const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  productionYear: {
    type: Number,
    required: true,
  },
  engineCapacity: {
    type: String,
    required: true,
  },
  enginePower: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
