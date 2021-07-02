// * all the user related routes controllers are here (CRUD)

// dependencies
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// utils
const { cloudinary } = require("../utils/cloudinary");

// model
const User = require("../models/users");

module.exports = {
  // * for getting the user information's according to the id
  getUser: async function (req, res, next) {
    try {
      const { id } = req.params;

      // checking if the id is valid for mongoose query operation
      if (mongoose.Types.ObjectId.isValid(id)) {
        const user = await User.findOne({ _id: id });

        // checking if the user exists
        if (user) {
          res.status(201).send(user);
        } else {
          res.status(404).json({ message: "User was not found" });
        }
      } else {
        res.status(404).json({ message: "User was not found" });
      }
    } catch (err) {
      next(err);
    }
  },

  // * for uploading and updating user avatar for the user profile
  uploadAvatar: async function (req, res, next) {
    try {
      const { userId } = req.body;

      // uploading in cloudinary
      const cloudinaryRes = await cloudinary.uploader.upload(req.file.path, {
        folder: "devR-Commerce/users",
      });

      // updating the user photoUrl and photoId field
      // and if any photoUrl already exists, I want to delete the
      // previous image in cloudinary gallery (line:51)
      await User.findById(userId, (err, user) => {
        if (user.photoId) {
          cloudinary.uploader.destroy(user.photoId, {
            folder: "devR-Commerce/users",
          });
        }

        user.photoUrl = cloudinaryRes.secure_url;
        user.photoId = cloudinaryRes.public_id;

        user.save();

        res.status(200).json({ message: "Avatar Updated", user });
      });
    } catch (err) {
      next(err);
    }
  },

  // * for updating user account information like email, username etc
  updateAccountInformation: async function (req, res, next) {
    try {
      const { name, email, phone, about, country, showEmail, showPhone, id } =
        req.body;

      await User.findById(id, (err, user) => {
        if (err) {
          res.send(err);
        }

        user.name = name;
        user.email = email;
        user.phone = phone;
        if (about) user.about = about;
        user.country = country;
        user.showEmail = showEmail;
        user.showPhone = showPhone;

        user.save();

        res.status(201).json({ message: "Account updated successfully", user });
      });
    } catch (err) {
      next(err);
    }
  },

  // * for updating user security information (password)
  updateSecurityInformation: async function (req, res, next) {
    try {
      const { password, id } = req.body;

      await User.findById(id, (err, user) => {
        if (err) {
          next(err);
        }

        user.password = password;
        user.save();
        res
          .status(201)
          .json({ message: "Password updated successfully", user });
      });
    } catch (err) {
      next(err);
    }
  },
};
