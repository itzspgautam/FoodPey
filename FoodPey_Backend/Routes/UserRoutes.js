const express = require("express");
const {
  register,
  login,
  tokenVerification,
} = require("../Controllers/UserController");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/verify").post(tokenVerification); //Token verification

module.exports = router;
