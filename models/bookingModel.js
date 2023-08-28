const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  passenger: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  passengerLocation: {
    longitude: { type: Number },
    latitude: { type: Number },
  },
  passengerDestination: {
    longitude: { type: Number },
    latitude: { type: Number },
  },
  amount: Number,
  travelDate: { type: Date },
  bookingStatus: { type: String, enum: ["pending", "accepted", "decline"] },
  journeyStatus: { type: String, enum: ["not started", "started", "ended"] },
  review: { type: String, required: [true, "review is required"] },
  rating: { type: Number, required: [true, "rating is required"], min: 0, max: 10 },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = { Booking };
