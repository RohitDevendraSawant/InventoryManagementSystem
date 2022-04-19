const mongoose = require("mongoose");
const { Schema } = mongoose;
const ItemSchema = new Schema({
  lab: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  specification: {
    type: String,
    required: true,
  },
  configurationNumber: {
    type: String,
    default : "Not allocated"
  },
  date: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("items", ItemSchema);