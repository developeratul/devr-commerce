const mongoose = require("mongoose");

// utils
const { cloudinary } = require("../utils/cloudinary");

// models
const Product = require("../models/product");
const User = require("../models/users");
const Review = require("../models/review");

module.exports = {
  // * for getting the informations of a single product according the id
  getProduct: async function (req, res, next) {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        res.status(404).json({ message: "Product not found" });
      }

      const product = await Product.findOne({ _id: id })
        .populate({ path: "user", populate: { path: "products" } })
        .populate({ path: "reviews", populate: { path: "reviewer" } });

      if (!product) {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(200).json({ product, user: product.user });
      }
    } catch (err) {
      next(err);
    }
  },

  // * for getting all the product informations
  getAllProducts: async function (req, res, next) {
    try {
      const products = await Product.find({})
        .populate({ path: "user reviews" })
        .sort({ uploadTimeInMl: -1 });
      res.status(200).json({ products });
    } catch (err) {
      next(err);
    }
  },

  // * for uploading a product
  postProduct: async function (req, res, next) {
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

      const tags = title.toLowerCase().split(" ");
      tags.push(product_category.toLowerCase());

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
        tags,
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
      const multiplePicturePromise = allProductImageIdInArray.map((pictureId) =>
        cloudinary.uploader.destroy(pictureId)
      );
      await Promise.all(multiplePicturePromise);

      // deleting the product
      await Product.findOneAndRemove({ _id: productId }, (err) => {
        if (err) {
          next(err);
        }
      });

      // removing the product from the user schema
      await User.updateOne({ _id: userId }, { $pull: { products: productId } });
      // removing the product oriented reviews from the user schema
      await User.updateOne(
        { _id: userId },
        { $pull: { reviews: { $in: theProduct.reviews } } }
      );
      // removing all the product oriented reviews in from Review Schema
      await Review.deleteMany({
        _id: { $in: theProduct.reviews },
      });

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
      const { productId, shipping_options } = req.body;
      const { title, desc, price, max_quantity, product_category } = req.body;
      const pictureFiles = req.files;

      const product = await Product.findOne({ _id: productId });
      let allImagesSeparatedInObject = product.images;

      // removing previous images
      if (pictureFiles.length > 0) {
        const removePrevImageRes = product.images.map((image) => {
          cloudinary.uploader.destroy(image.photoId);
        });
        await Promise.all(removePrevImageRes);
      }

      // uploading new products
      // map through images and create a promise array using cloudinary upload function
      if (pictureFiles.length > 0) {
        const multiplePicturePromise = pictureFiles.map((picture) =>
          cloudinary.uploader.upload(picture.path, {
            folder: `devR-Commerce/products/${req.user.name}`,
          })
        );
        const imageResponses = await Promise.all(multiplePicturePromise);
        // separating each of the images into objects
        allImagesSeparatedInObject = imageResponses.map((img) => ({
          photoId: img.public_id,
          photoUrl: img.secure_url,
        }));
      }

      // updating the product informations
      await Product.findById(productId, (err, product) => {
        if (err) {
          next(err);
        }

        product.title = title;
        product.desc = desc;
        product.price = price;
        product.max_quantity = max_quantity;
        product.product_category = product_category;
        product.shipping_options = JSON.parse(shipping_options);
        product.images = allImagesSeparatedInObject;

        product.save();
        res
          .status(200)
          .json({ message: "Product updated successfully", product });
      });
    } catch (err) {
      next(err);
    }
  },
};
