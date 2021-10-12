const express = require("express");
const router = express.Router();

// models
const Product = require("../models/product");

// utils
const stripe = require("../utils/stripe");

router.post("/checkout_and_place_order", async (req, res, next) => {
  try {
    const { cart_items } = req.body;
    const products = await Product.find({});
    const productsMap = new Map();

    for (let i = 0; i < products.length; i++) {
      productsMap.set(products[i]._id.toString(), products[i]);
    }

    // creating the checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cart_items.map((item) => {
        const product = productsMap.get(item._id.toString());
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: product.title,
            },
            unit_amount: product.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      // success_url: `${process.env.CLIENT_URL}/`,
      // cancel_url: `${process.env.CLIENT_URL}/cart`,
    });

    res.status(200).json({ url: checkoutSession.url });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
