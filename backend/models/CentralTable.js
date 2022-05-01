const mongoose = require("mongoose");
const { Schema } = mongoose;
const CentralTableSchema = new Schema({
  bill: {
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
  quantity: {
    type: Number,
    default: 0,
  },
  cost: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
  },
  tokens:[
    {
      labs: {
        type : String,
      },
      quantity : {
        type : String,
      },
      date : {
        type : String,
        default : new Date().toLocaleString()
      }
    }
  ]

});

module.exports = mongoose.model("centralTable", CentralTableSchema);