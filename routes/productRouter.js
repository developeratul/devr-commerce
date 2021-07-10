const express = require("express");
const router = express.Router();

// middlewares
const checkAuth = require("../middlewares/checkAuth");

// utils
const multer = require("../utils/multer");

// controllers
const {
  postProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");

// for uploading a product
router.post(
  "/post_product",
  checkAuth,
  multer.array("assets", 10),
  postProduct
);

// for deleting a product
router.delete("/delete_product", checkAuth, deleteProduct);

// for updating a product
router.post("/update_product", checkAuth, updateProduct);

module.exports = router;
