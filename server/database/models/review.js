const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  image: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  email: {
    type: String,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  name: { type: String, required: true },
  user_image: { type: String, required: true },
  sub: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", reviewSchema);
