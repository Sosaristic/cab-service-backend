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
  bookingStatus: { type: String, enum: ["pending", "accepted", "declined"] },
  journeyStatus: { type: String, enum: ["pending", "started", "ended"] },
  review: { type: String },
  rating: { type: Number, required: [true, "rating is required"], min: 0, max: 10 },
  bookingId: { type: String, unique: true, required: [true, "booking it is required"] },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = { Booking };
