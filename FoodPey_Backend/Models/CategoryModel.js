const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  storeID: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Vendor authentication is required."],
  },
  name: {
    type: String,
    required: [true, "Category name is required"],
  },
  icon: {
    type: String,
    required: [true, "Category icon is required"],
  },
});

module.exports = mongoose.model("category", categorySchema);
