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

      // update the informations of the cart_items if the product is updated
      for (let i = 0; i < allProducts.length; i++) {
        const updated_items = available_cart_items.map((item) => {
          if (item._id.toString() === allProducts[i]._id.toString()) {
            item.title = allProducts[i].title;
            item.price = allProducts[i].price;
            item.max_quantity = allProducts[i].max_quantity;
            item.shipping_options = allProducts[i].shipping_options;
            item.total_price = allProducts[i].price * item.quantity;
          }

          return item;
        });

        available_cart_items = updated_items;
      }

      // update the cart_item field in the user document
      await User.updateOne(
        { _id: userId },
        { cart_items: available_cart_items }
      );

      res.status(200).send(available_cart_items);
    } catch (err) {
      next(err);
    }
  },
};
