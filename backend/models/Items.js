const mongoose = require("mongoose");
const { Schema } = mongoose;
const ItemSchema = new Schema({
    lab: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category : {
    type : String,
    required : true
  },
  quantity: {
    type: Number,
    required: true,
  },
  date :{
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('items',ItemSchema);

