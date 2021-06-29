const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

// controllers
const {
  registerUser,
  checkAuthController,
  logOutUser,
  loginUser,
} = require("../controllers/authController");

// for registering a new user
router.post("/register", registerUser);

// for logging in a user
router.post("/login", loginUser);

// for verifying if the user is logged in
router.get("/", checkAuth, checkAuthController);

// for logging out a user
router.get("/logout", checkAuth, logOutUser);

module.exports = router;