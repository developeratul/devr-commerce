const express = require("express");
const router = express();

// controllers
const { getUser } = require("../controllers/userController");

router.get("/:id", getUser);

module.exports = router;
