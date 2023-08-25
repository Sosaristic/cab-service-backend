const express = require("express");
const router = express.Router();
const loginUser = require("../controllers/loginController");
const signUpUser = require("../controllers/signUpController");

router.post("/login", loginUser);
router.post("/register", signUpUser);

module.exports = router;
