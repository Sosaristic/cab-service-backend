const mongoose = require("mongoose");

const refreshTokenSchema = mongoose.Schema(
  {
    token: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", refreshTokenSchema);
