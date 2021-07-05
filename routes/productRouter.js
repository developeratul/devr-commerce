const express = require("express");
const router = express.Router();

// middlewares
const checkAuth = require("../middlewares/checkAuth");

// utils
const multer = require("../utils/multer");

// controllers
const { postProduct } = require("../controllers/productController");

// for uploading a product
router.post(
  "/post_product",
  checkAuth,
  multer.array("assets", 10),
  postProduct
);

module.exports = router;
