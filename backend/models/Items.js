const mongoose = require("mongoose");
const { Schema } = mongoose;
const ItemSchema = new Schema({
  lab: {
    type: String,
    required: true,
  },
  configurationNumber: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    default : "Electronics"
  },
  subcategory : {
    type : String,
    required : true
  },
  price : {
    type : String,
    required : true,
    default : 00
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("items", ItemSchema);
