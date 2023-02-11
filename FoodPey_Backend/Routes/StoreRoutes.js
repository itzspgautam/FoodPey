const express = require("express");
const {
  createStore,
  getNearbyStores,
} = require("../Controllers/StoreController");
const { isVendor } = require("../Middleware/auth");

const router = express.Router();

router.route("/store").post(isVendor, createStore);

router.route("/stores/nearby").get(getNearbyStores);

module.exports = router;
