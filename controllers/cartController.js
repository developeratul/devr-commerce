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

      // the authenticated user
      const user = await User.findOne({ _id: userId });

      // his cart items
      const user_cart = user.cart_items;
      // all products in my products collection
      const allProducts = await Product.find({});

      let user_cart_map = new Map([]);

      // inserting all the cart items in the Map data structure
      for (let i = 0; i < user_cart.length; i++) {
        user_cart_map.set(user_cart[i]._id.toString(), user_cart[i]);
      }

      let available_cart_items = [];

      // getting the available cart items
      for (let i = 0; i < allProducts.length; i++) {
        available_cart_items.push(
          user_cart_map.get(allProducts[i]._id.toString())
        );
      }

      // if there is a falsy value, remove it!
      if (
        available_cart_items.includes(undefined) ||
        available_cart_items.includes(null)
      ) {
        available_cart_items = available_cart_items.filter(
          (item) => item !== undefined && item !== null
        );
      }

      // update the cart_item field in the user document
      // if the previous cart doesn't matches with the available_cart_items,
      // it means the cart item is unavailable
      if (available_cart_items.toString() !== user_cart.toString()) {
        await User.updateOne(
          { _id: userId },
          { cart_items: available_cart_items }
        );
      }

      res.status(200).send(available_cart_items);
    } catch (err) {
      next(err);
    }
  },
};
