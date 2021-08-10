const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  reviewText: { type: String, required: true },
  reviewStar: { type: Number, required: true },
  reviewer: { type: mongoose.Types.ObjectId, ref: "USER", required: true },
  product: { type: mongoose.Types.ObjectId, ref: "PRODUCT", required: true },
  time: {
    type: String,
    required: true,
    default: new Date().toLocaleDateString(),
  },
  uploadTime: { type: String, default: Date.now() },
});

const Review = new mongoose.model("REVIEW", dataSchema);

module.exports = Review;
