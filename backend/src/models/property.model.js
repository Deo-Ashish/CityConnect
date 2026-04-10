const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  description: String,

  price: {
    type: Number,
    required: true,
  },

  location: {
    city: String,
    area: String,
    address: String,
  },

  images: {
    type: String,
    required: true,
  }, // ImageKit URLs

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  type: {
    type: String,
    enum: ["flat", "pg", "hostel", "house"],
  },

  bedrooms: Number,
  bathrooms: Number,

  available: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const propertyModel = mongoose.model("property", propertySchema);

module.exports = propertyModel;
