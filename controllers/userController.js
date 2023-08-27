const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Token = require("../models/refreshToken");
const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
}
function generateRefreshToken(user) {
  return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
}

async function revokeRefreshToken(refreshToken) {
  try {
    const deleted = await Token.findOneAndDelete({ token: refreshToken });
    return deleted;
  } catch (error) {}
}
// @ login user
// @route POST /api/user
// @access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }
  try {
    const user = await User.login(email, password);
    if (!user) {
      res.status(400);
      throw new Error("invalid email or password");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    const token = await Token.create({ token: refreshToken });

    if (token) {
      res.cookie("accessToken", accessToken, { httpOnly: true });
      res.cookie("refreshToken", refreshToken, { httpOnly: true });
      res.status(200).json({ message: "login successful" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// @ sign up user
// @route POST /api/user
// @access public
const signUpUser = asyncHandler(async (req, res) => {
  const { email, password, accountType, lastName, firstName, taxiType, licenseNumber } = req.body;
  if (
    accountType === "driver" &&
    (!email || !password || !lastName || !firstName || !taxiType || !licenseNumber)
  ) {
    res.status(400);
    throw new Error("All fields are required");
  }
  if (accountType === "passenger" && (!email || !password || !lastName || !firstName)) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const isUserAvailable = await User.findOne({ email });

  if (isUserAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    email,
    password,
    accountType,
    lastName,
    firstName,
    taxiType: accountType == "driver" ? taxiType : null,
    licenseNumber: accountType == "driver" ? licenseNumber : null,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email, message: "registration successful" });
  } else {
    res.status(400);
    throw new Error("driver data is not valid");
  }
});

// @ current user
// @route GET /api/user
// @access private

const getUser = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    res.status(400);
    throw new error("user not found");
  }
  res.status(200).json(user);
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}

  const deleted = revokeRefreshToken(req.cookies.refreshToken);

  deleted
    .then((result) => {
      if (result) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.status(201).json({ message: "logout successfully" });
      }
    })
    .catch((err) => {
      res.status(401);
      throw new Error("could not logout");
    });
});

module.exports = { loginUser, signUpUser, getUser, logoutUser, generateAccessToken };
