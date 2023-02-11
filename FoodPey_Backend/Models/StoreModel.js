const mongoose = require("mongoose");

const storeSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter store name."],
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Authentication required."],
  },
  poster: {
    type: String,
    required: [true, "Poster required."],
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

storeSchema.index({ coordinates: "2dsphere" });

module.exports = mongoose.model("store", storeSchema);
