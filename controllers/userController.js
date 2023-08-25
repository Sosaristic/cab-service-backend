const asyncHandler = require("express-async-handler");

const Users = require("../models/userModel");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @ login user
// @route POST /api/users
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await Users.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("account does not exist");
  }

  if (user && (await bycrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: { email: user.email, id: user.id },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is not correct");
  }
});

// @ login user
// @route POST /api/users
// @access public
const signUpUser = asyncHandler(async (req, res) => {
  const { email, password, accountType, lastName, firstName, taxiType, licenseNumber } = req.body;
  if (!email || !password || !lastName || !firstName) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const isUserAvailable = await Users.findOne({ email });

  if (isUserAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bycrypt.hash(password, 10);
  const user = await Users.create({
    email,
    password: hashedPassword,
    accountType,
    lastName,
    firstName,
    taxiType,
    licenseNumber,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("driver data is not valid");
  }
});

module.exports = { loginUser, signUpUser };
