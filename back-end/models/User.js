const mongoose = require("mongoose");
const User = mongoose.Schema({
  name: { type: String },
  type: { type: String, enum: ["user", "admin"] },
});

module.exports = mongoose.model("User", User);
