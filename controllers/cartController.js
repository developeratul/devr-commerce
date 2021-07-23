// models
const User = require("../models/users");
// const Product = require("../models/product");

module.exports = {
  updateCart: async function (req, res, next) {
    try {
      const { items } = req.body;
      const userId = req.user._id;

      await User.updateOne({ _id: userId }, { cart_items: items });

      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  },

  getCartData: async function (req, res, next) {
    try {
      const userId = req.user._id;

      const user = await User.findOne({ _id: userId });

      const user_cart = user.cart_items;
      // const allProducts = await Product.find({});

      res.status(200).send(user_cart);
    } catch (err) {
      next(err);
    }
  },
};
