const asyncHandler = require("express-async-handler");
const Drivers = require("../models/driverModel");

const Passengers = require("../models/passengerModel");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @ login user
// @route POST /api/users
// @access private
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, accountType } = req.body;
  if (!email || !password || !accountType) {
    res.status(400);
    throw new Error("All fields are required");
  }

  //   driver login
  if (accountType == "driver") {
    const driver = await Drivers.findOne({ email });
    if (!driver) {
      res.status(400);
      throw new Error("You do not have an account");
    }

    if (driver && (await bycrypt.compare(password, driver.password))) {
      const accessToken = jwt.sign(
        { user: { email: driver.email, id: driver.id } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("Email or password is not correct");
    }
  }

  //   for passenger
  else {
    const passenger = await Passengers.findOne({ email });
    if (!passenger) {
      res.status(400);
      throw new Error("account does not exist");
    }

    if (passenger && (await bycrypt.compare(password, passenger.password))) {
      const accessToken = jwt.sign(
        { user: { email: passenger.email, id: passenger.id } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("Email or password is not correct");
    }
  }
});

module.exports = loginUser;
