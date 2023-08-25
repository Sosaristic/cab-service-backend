const mongoose = require("mongoose");

const passengerSchema = mongoose.Schema({
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
});

module.exports = mongoose.model("Passengers", passengerSchema);
