const express = require("express");
const router = express.Router();
const { signUpUser, loginUser, getUser, logoutUser } = require("../controllers/userController");
const authUsers = require("../middleware/authUsers");

router.post("/login", loginUser);
router.post("/register", signUpUser);
router.get("/current", authUsers, getUser);
router.post("/logout", authUsers, logoutUser);
router.get("/get-cookies", (req, res) => {
  res.cookie("test", "test cookie", { maxAge: 5 * 60 * 1000, httpOnly: true });
  res.json({ message: "setting cookies" });
});
router.get("/set-cookies", (req, res) => {
  const cookie = req.cookies.test;
  res.status(200).send(cookie);
});
module.exports = router;
