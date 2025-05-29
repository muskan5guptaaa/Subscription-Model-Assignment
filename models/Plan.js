const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  name: String,
  price: Number,
  features: [String],
  duration: Number, 
});

module.exports = mongoose.model("Plan", planSchema);
