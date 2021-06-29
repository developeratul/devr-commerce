const mongoose = require("mongoose");

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
};
