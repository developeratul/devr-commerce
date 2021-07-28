// models
const User = require("../models/users");
const Product = require("../models/product");

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
      const allProducts = await Product.find({});

      const availableProducts = user_cart.filter((cartItem) =>
        allProducts.map((product) => cartItem._id === product._id)
      );

      // console.log(availableProducts);

      res.status(200).send(availableProducts);
    } catch (err) {
      next(err);
    }
  },
};
