const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
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
    required: [true, "last name is required"],
  },
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  licenseNumber: {
    type: String,
    required: [true, "license number is required"],
    unique: [true, "license number is already taken"],
  },
  taxiType: {
    type: String,
    required: [true, "taxi type is required"],
  },
});

module.exports = mongoose.model("Drivers", driverSchema);
