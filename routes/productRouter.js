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
  getProduct,
  getAllProducts,
  searchProduct,
} = require("../controllers/productController");

// for getting a single product data according to the id
router.get("/product_id/:id", getProduct);

// for getting all the products
router.get("/products", getAllProducts);

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
router.post(
  "/update_product",
  checkAuth,
  multer.array("assets", 10),
  updateProduct
);

module.exports = router;
