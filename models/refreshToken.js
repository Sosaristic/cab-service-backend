const mongoose = require("mongoose");

const refreshTokenSchema = mongoose.Schema({
  token: String,
});

module.exports = mongoose.model("Token", refreshTokenSchema);
