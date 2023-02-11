const express = require("express");
const {
  createAddress,
  getAddress,
} = require("../Controllers/AddressController");
const { isUser } = require("../Middleware/auth");

const router = express.Router();

router.route("/address/new").post(isUser, createAddress);

router.route("/addresses").get(isUser, getAddress);

module.exports = router;
