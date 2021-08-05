// models
const Review = require("../models/review");
const User = require("../models/users");
const Product = require("../models/product");

module.exports = {
  // * for posting a review
  postReview: async function (req, res, next) {
    try {
      const { stars, text, reviewer, productId, productAuthorId } = req.body;

      // creating a new review instance
      const newReview = new Review({
        reviewText: text,
        reviewStar: stars,
        reviewer,
        product: productId,
      });

      // saving the review
      newReview.save((err) => {
        if (err) {
          next(err);
        }
      });

      // pushing the review in the user and product schema
      // updating the user
      await User.updateOne(
        { _id: productAuthorId },
        { $push: { reviews: newReview._id } }
      );
      // updating the product
      await Product.updateOne(
        { _id: productId },
        { $push: { reviews: newReview._id } }
      );

      // updating the product and user average rating
      const theProduct = await Product.findOne({ _id: productId }).populate(
        "reviews"
      );
      const theUser = await User.findOne({ _id: productAuthorId }).populate(
        "reviews"
      );

      // getting the average rating of the product
      const getProductAverageRating = () => {
        let averageRating = 0;
        let temp = [];

        if (theProduct.reviews.length > 0) {
          for (let i = 0; i < theProduct.reviews.length; i++) {
            temp.push(theProduct.reviews[i].reviewStar);
          }
        }

        let total = 0;
        for (let i = 0; i < temp.length; i++) {
          total += temp[i];
        }

        averageRating = ~~(total / temp.length);

        return averageRating;
      };

      // getting the average rating of the user
      const getAuthorAverageRating = () => {
        let averageRating = 0;
        let temp = [];

        if (theUser.reviews.length > 0) {
          for (let i = 0; i < theUser.reviews.length; i++) {
            temp.push(theUser.reviews[i].reviewStar);
          }
        }

        let total = 0;
        for (let i = 0; i < temp.length; i++) {
          total += temp[i];
        }

        averageRating = ~~(total / temp.length);

        return averageRating;
      };

      // updating and saving them in the database
      await Product.updateOne(
        { _id: productId },
        { averageRating: getProductAverageRating() }
      );
      await User.updateOne(
        { _id: productAuthorId },
        { averageRating: getAuthorAverageRating() }
      );

      const updatedProduct = await Product.findOne({ _id: productId })
        .populate({ path: "user", populate: { path: "products" } })
        .populate({ path: "reviews", populate: { path: "reviewer" } });

      res
        .status(200)
        .json({ message: "Review Posted", product: updatedProduct });
    } catch (err) {
      next(err);
    }
  },

  // * for deleting a review
  deleteReview: async function (req, res, next) {
    try {
      const { reviewId, productId } = req.body;
      const user = req.user;

      // deleting the review
      await Review.findOneAndRemove({ _id: reviewId });

      // updating the product reviews
      await Product.updateOne(
        { _id: productId },
        { $pull: { reviews: reviewId } }
      );
      const updatedProduct = await Product.findOne({ _id: productId })
        .populate({ path: "user", populate: { path: "products" } })
        .populate({ path: "reviews", populate: { path: "reviewer" } });

      // updating the user
      await User.updateOne({ _id: user._id }, { $pull: { reviews: reviewId } });

      res
        .status(200)
        .json({ message: "Review Deleted", product: updatedProduct });
    } catch (err) {
      next(err);
    }
  },
};
