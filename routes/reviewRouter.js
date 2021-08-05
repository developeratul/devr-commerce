const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");

// controllers
const {
  postReview,
  deleteReview,
} = require("../controllers/reviewRouterController");

// for posting a review
router.post("/post_review", checkAuth, postReview);

// for deleting a review
router.delete("/delete_review", checkAuth, deleteReview);

module.exports = router;
