const express = require("express");
const router = express.Router();

const checkAuth = require("../middlewares/checkAuth");

const { updateCart, getCartData } = require("../controllers/cartController");

// for adding a product in the cart
router.post("/update_cart", checkAuth, updateCart);
// for sending the cart informations of the authenticated user
router.get("/get_cart_items", checkAuth, getCartData);

module.exports = router;
