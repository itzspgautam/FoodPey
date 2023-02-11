const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter you full name."],
    minlength: [4, "Name is too short."],
  },
  phone: {
    type: Number,
  },
  email: {
    type: String,
    required: [true, "Please enter email address."],
  },
  password: {
    type: String,
    required: [true, "Please enter paswword."],
    select: false,
  },
  role: {
    type: String,
    default: "user",
  },
});

// pre hash password
userSchema.pre("save", function (next) {
  if (this.password) {
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
  }
  next();
});

module.exports = mongoose.model("user", userSchema);
