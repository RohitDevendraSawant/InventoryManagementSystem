const mongoose = require("mongoose");
const { Schema } = mongoose;
const RequestSchema = new Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  lab : {
    type : String,
    required : true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
});

module.exports = mongoose.model("request", RequestSchema);
