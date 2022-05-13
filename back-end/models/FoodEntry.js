const mongoose = require("mongoose");
const FoodEntry = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productName: { type: String },
  cost: { type: Number },
  calories: { type: Number },
  consumedAt: { type: Number },
});

module.exports = mongoose.model("FoodEntry", FoodEntry);
