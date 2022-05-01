const mongoose = require("mongoose");
const { Schema } = mongoose;
const MoveSchema = new Schema({
  prod_id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  lab: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("MoveInfo", MoveSchema);
