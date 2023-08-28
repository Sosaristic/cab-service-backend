const { generateAccessToken } = require("../controllers/userController");
const Token = require("../models/refreshToken");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authUsers = (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;
  if (!accessToken || !refreshToken) {
    res.status(401);
    throw new Error("access token missing");
  }
  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError" && refreshToken) {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
          if (err) {
            res.status(401);
            throw new Error("invalid token");
          }
          const storedToken = await Token.findOne({ token: refreshToken });
          if (!storedToken) {
            res.status(401);
            throw new Error("invalid token");
          }

          const refreshedUser = await User.findById(decoded.userId);
          if (!refreshedUser) {
            res.status(400);
            throw new Error("User not found");
          }

          const newAccessToken = generateAccessToken(refreshedUser);
          res.cookie("accessToken", newAccessToken, { httpOnly: true });
          req.user = refreshedUser;
          next();
        });
      } else {
        res.status(403);
        throw new Error("Invalid access token");
      }
    } else {
      try {
        const user = await User.findById(decoded.userId).select("-password").exec();
        req.user = user;
      } catch (error) {}

      next();
    }
  });
};

module.exports = authUsers;
