const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");

// controllers
const {
  registerUser,
  checkAuthController,
} = require("../controllers/authController");

// for registering a new user
router.post("/register", registerUser);

router.post("/login", (req, res) => {
  res.send("The login route");
});

// for verifying if the user is logged in
router.get("/", checkAuth, checkAuthController);

module.exports = router;
