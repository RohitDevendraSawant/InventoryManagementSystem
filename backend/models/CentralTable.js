const mongoose = require("mongoose");
const { Schema } = mongoose;
const CentralTableSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model("centralTable", CentralTableSchema);
