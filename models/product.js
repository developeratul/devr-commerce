const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const dataSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  uploadTime: {
    type: String,
    default: `${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`,
  },
  images: [{ photoId: String, photoUrl: String }],
  price: { type: String, required: true },
  max_quantity: { type: String, required: true },
  shippingCountries: { type: Array, required: true },
  userId: { type: ObjectId, ref: "USER", required: true },

  product_category: {
    type: String,
    required: true,
    enum: [
      "Tech",
      "Toys",
      "Films and Cd's",
      "Car accessories",
      "Grocery",
      "Nonfood & Pharmacy",
      "Style & Fashion",
      "Sports Accessories",
      "Electrical technologies",
      "Cosmetics and Beauty",
      "Home and furniture",
      "Cloths and fabrics",
      "Books and Educational accessories",
      "Household appliances",
      "Toys and baby products",
      "DIY garden and pet",
    ],
  },

  //   * add shipping options once I have completed working on the store settings page
  //   shipping_options: []
});

const Product = new mongoose.model("PRODUCT", dataSchema);

module.exports = Product;
