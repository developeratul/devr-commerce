const express = require("express");
const router = express.Router();

// controllers
const { registerUser } = require("../controllers/authController");

// for registering a new user
router.post("/register", registerUser);

router.post("/login", (req, res) => {
  res.send("The login route");
});

module.exports = router;
