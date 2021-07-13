// models
const User = require("../models/users");
const Product = require("../models/product");

module.exports = {
  updateCart: async function (req, res, next) {
    try {
      const { items } = req.body;
      const userId = req.user._id;

      await User.findById(userId, (err, user) => {
        if (err) {
          next(err);
        }

        user.cart_items = items;

        user.save();

        res.sendStatus(200);
      });
    } catch (err) {
      next(err);
    }
  },

  getCartData: async function (req, res, next) {
    try {
      const userId = req.user._id;

      const user = await User.findOne({ _id: userId });
      const user_cart = user.cart_items;

      const userCartItemIds = user_cart.map((i) => i._id);

      // // checking which products are available in the user's cart
      // // const availableCartItems = Product.find({
      // //   _id: { $in: userCartItemIds },
      // // });

      // // const availableCartItemIds = availableCartItems.map((i) => i._id);

      res.status(200).send(user_cart);
    } catch (err) {
      next(err);
    }
  },
};
