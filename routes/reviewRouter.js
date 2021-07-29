const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");

// controllers
const { postReview } = require("../controllers/reviewRouterController");

// for posting a review
router.post("/post_review", checkAuth, postReview);

module.exports = router;
