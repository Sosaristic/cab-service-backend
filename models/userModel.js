const bycrypt = require("bcrypt");

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

userSchema.pre("save", async function (next) {
  const salt = await bycrypt.genSalt();
  this.password = await bycrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bycrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw new Error("Email or password is not correct");
  }
  throw new Error("Account not found");
};
module.exports = mongoose.model("User", userSchema);
