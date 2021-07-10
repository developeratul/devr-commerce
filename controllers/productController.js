// utils
const { cloudinary } = require("../utils/cloudinary");

// models
const Product = require("../models/product");
const User = require("../models/users");

module.exports = {
  // * for uploading a product
  async postProduct(req, res, next) {
    try {
      const pictureFiles = req.files;

      // map through images and create a promise array using cloudinary upload function
      const multiplePicturePromise = pictureFiles.map((picture) =>
        cloudinary.uploader.upload(picture.path, {
          folder: `devR-Commerce/products/${req.user.name}`,
        })
      );

      const imageResponses = await Promise.all(multiplePicturePromise);

      // separating each of the images into objects
      const allImagesSeparatedInObject = imageResponses.map((img) => ({
        photoId: img.public_id,
        photoUrl: img.secure_url,
      }));

      const {
        title,
        desc,
        price,
        max_quantity,
        product_category,
        shipping_options,
      } = req.body;

      // creating a new product instance
      const newProduct = new Product({
        title,
        desc,
        price,
        max_quantity,
        product_category,
        shipping_options: JSON.parse(shipping_options),
        user: req.user._id,
        images: allImagesSeparatedInObject,
      });

      // saving the product in my database
      const savedProduct = await newProduct.save();

      // creating relation between these two collections: Product and User
      await User.updateOne(
        { _id: req.user._id },
        { $push: { products: savedProduct._id } }
      );

      res
        .status(200)
        .json({ message: "Product uploaded successfully", newProduct });
    } catch (err) {
      next(err);
    }
  },

  // * for deleting a product
  deleteProduct: async function (req, res, next) {
    try {
      const { productId } = req.body;
      const userId = req.user._id;

      const theProduct = await Product.findOne({ _id: productId });

      // putting all the product image id under an array so I can use this array to delete all these images
      const allProductImageIdInArray = theProduct.images.map(
        (singleImage) => singleImage.photoId
      );

      // deleting all product images
      const multiplePicturePromise = allProductImageIdInArray.map((picture) =>
        cloudinary.uploader.destroy(picture, {
          folder: `devR-Commerce/products/${req.user.name}`,
        })
      );

      await Promise.all(multiplePicturePromise);

      await Product.findOneAndRemove({ _id: productId }, (err) => {
        if (err) {
          next(err);
        }
      });

      await User.updateOne({ _id: userId }, { $pull: { products: productId } });

      const updatedUser = await User.findOne({ _id: userId });

      res.status(200).json({
        message: "The product was deleted",
        user: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  },

  // * for updating a product
  updateProduct: async function (req, res, next) {
    try {
      const { productId } = req.body;
    } catch (err) {
      next(err);
    }
  },
};
