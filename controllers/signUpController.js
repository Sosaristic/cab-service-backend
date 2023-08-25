const asyncHandler = require("express-async-handler");
const Drivers = require("../models/driverModel");
const Passengers = require("../models/passengerModel");
const bycrypt = require("bcrypt");

// @ signUp user
// @route POST /api/users
// @access public
const signUpUser = asyncHandler(async (req, res) => {
  const { email, password, accountType, lastName, firstName, taxiType, licenseNumber } = req.body;

  if (accountType == "driver") {
    if (!email || !password || !lastName || !firstName || !licenseNumber) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const isDriverAvailable = await Drivers.findOne({ email });
    if (isDriverAvailable) {
      res.status(400);
      throw new Error("Driver already exist");
    }

    const hashedPassword = await bycrypt.hash(password, 10);
    const driver = await Drivers.create({
      email,
      password: hashedPassword,
      accountType,
      lastName,
      firstName,
      taxiType,
      licenseNumber,
    });
    if (driver) {
      res.status(201).json({ _id: driver.id, email: driver.email });
    } else {
      res.status(400);
      throw new Error("driver data is not valid");
    }
  }

  // if its a passenger
  else {
    if (!email || !password || !lastName || !firstName) {
      res.status(400);
      throw new Error("All fields are required");
    }

    const isPassengerAvailable = await Passengers.findOne({ email });
    if (isPassengerAvailable) {
      res.status(404);
      throw new Error("Passenger already exist");
    }

    const hashedPassword = await bycrypt.hash(password, 10);
    const passenger = await Passengers.create({
      email,
      password: hashedPassword,
      accountType,
      lastName,
      firstName,
    });
    if (passenger) {
      res.status(201).json({ _id: passenger.id, email: passenger.email });
    } else {
      res.status(400);
      throw new Error("Passenger data is not valid");
    }
  }
});

module.exports = signUpUser;
