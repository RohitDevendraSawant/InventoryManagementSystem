const mongoose = require("mongoose");
const { Schema } = mongoose;
const StaffSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("staff", StaffSchema);
