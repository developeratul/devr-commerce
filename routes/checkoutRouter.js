const express = require("express");
const router = express.Router();

router.post("/checkout_and_place_order", (req, res, next) => {
  try {
    const { cart_items } = req.body;

    res.send(cart_items);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
