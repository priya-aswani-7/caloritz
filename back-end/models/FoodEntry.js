const mongoose = require("mongoose");
const FoodEntry = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: "User ID is required.",
    },
    productName: { type: String, required: "Product name is required." },
    cost: {
      type: Number,
      required: "Product cost is required.",
      min: [1, "Product cost must be positive."],
    },
    calories: {
      type: Number,
      required: "Product calories are required.",
      min: [1, "Product calories must be positive."],
    },
    consumedAt: {
      type: Number,
      required: "Product consumption date is required.",
      min: [0, "Product consumption date cannot precede Jan 1, 1970."],
      max: [
        new Date().getTime(),
        "Product consumption date cannot be in the future.",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FoodEntry", FoodEntry);
