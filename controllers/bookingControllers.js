const asyncHandler = require("express-async-handler");
const { Booking } = require("../models/bookingModel");
const { json } = require("express");

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

module.exports = { getCab, singleBooking };
