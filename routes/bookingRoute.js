const express = require("express");
const router = express.Router();
const { getCab, singleBooking } = require("../controllers/bookingControllers");
const { Booking } = require("../models/bookingModel");

// router.use(authUsers());
router.post("/book-cab", getCab);
router.get("/:id", singleBooking);

module.exports = router;
