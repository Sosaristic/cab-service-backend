const express = require("express");
const router = express.Router();
const { getCab, singleBooking, updateBooking } = require("../controllers/bookingControllers");
const { Booking } = require("../models/bookingModel");

// router.use(authUsers());
router.post("/book-cab", getCab);
router.route("/:bookingID").get(singleBooking).patch(updateBooking);

module.exports = router;
