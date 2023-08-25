const express = require("express");
const router = express.Router();
const { signUpUser, loginUser } = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/register", signUpUser);

module.exports = router;
