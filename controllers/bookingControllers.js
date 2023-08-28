const asyncHandler = require("express-async-handler");
const { Booking } = require("../models/bookingModel");
const { json } = require("express");

// @ book a cab
// @ route POST /api/booking

const getCab = asyncHandler(async (req, res) => {
  const bookingDetails = {
    passenger: "64ec51dfad63211a458087b7",
    driver: "64ec5191ad63211a458087ae",
    passengerLocation: { longitude: "79.5", latitude: "56.9" },
    passengerDestination: { longitude: "79.5", latitude: "56.9" },
    amount: 5000,
    travelDate: new Date(),
    bookingStatus: "pending",
    journeyStatus: "started",
    review: "journey was peaceful",
    rating: 6,
  };
  const bookingData = req.body;
  const book = await Booking.create(bookingDetails);
  console.log(book);
  if (!book) {
    res.status(401);
    throw new Error("error trying to book cab");
  }
  res.status(201).json(book);
});

// @ get single booking
// @ route GET /api/booking/:bookingID
// @access private

const singleBooking = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const isBookingAvailable = await Booking.findOne({ _id: id });
  if (!isBookingAvailable) {
    res.status(400);
    throw new Error("Booking not available");
  }
  const booking = await Booking.findOne({ _id: isBookingAvailable._id })
    .populate({ path: "passenger", select: "email lastName firstName" })
    .exec();
  if (!booking) {
    res.status(400);
    throw new Error("could not get booking");
  }
  res.status(200).json(booking);
});

// @ update booking details
// @ route PATCH /api/booking/:bookingID
// @ access private

const updateBooking = asyncHandler(async (req, res) => {
  const bookingID = req.params.bookingID;
  const newData = req.body;
  if (bookingID.length !== 24) {
    res.status(400);
    throw new Error("invalid booking id");
  }
  const isBookingAvailable = await Booking.findOne({ _id: bookingID });
  if (!isBookingAvailable) {
    res.status(400);
    throw new Error("booking not foud");
  }
  const filter = { _id: bookingID };
  const updatedBooking = await Booking.findOneAndUpdate(filter, newData, { new: true });
  if (updatedBooking) {
    res.status(200).json(updatedBooking);
  } else {
    res.status(400);
    throw new Error("Could not update data");
  }
});

module.exports = { getCab, singleBooking, updateBooking };
