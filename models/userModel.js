const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  accountType: {
    type: String,
    required: [true, "account type is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already taken"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  lastName: {
    type: String,
  },
  firstName: {
    type: String,
  },
  licenseNumber: {
    type: String,

    unique: [true, "license number is already taken"],
  },
  taxiType: {
    type: String,
  },
});

module.exports = mongoose.model("Users", userSchema);
