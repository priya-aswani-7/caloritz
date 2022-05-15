const mongoose = require("mongoose");
const User = mongoose.Schema({
  name: { type: String, required: "User name is required." },
  email: { type: String, required: "User email is required." },
  password: {
    type: String,
    required: "User password is required.",
  },
  type: {
    type: String,
    enum: ["user", "admin"],
    required: "User type is required.",
  },
});

module.exports = mongoose.model("User", User);
