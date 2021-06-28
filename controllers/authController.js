// models
const User = require("../models/users");

module.exports = {
  // * the registration controller
  registerUser: async function (req, res) {
    try {
      const { name, email, password, phone, country, isSeller } = req.body;

      const newUser = new User({
        name,
        email,
        password,
        country,
        phone,
        isSeller: isSeller === "true" ? true : false,
      });

      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(403).json({ message: "Email already exists" });
      } else {
        // saving the user information's and handling error
        await newUser.save().catch((err) => {
          if (err.message) {
            res.status(500).json({ message: err.message });
          } else {
            res.status(500).json({ message: err });
          }
        });

        // generating a cookie and storing it
        const token = await newUser.generateToken();
        res.cookie("auth", token, {
          expires: new Date().now + 25892000000,
          maxAge: 25892000000,
        });

        res.set("Access-Control-Expose-Headers", "Set-Cookie");
        res.set("withCredentials", true);
        res.status(200).json({ message: "Registration Successful" });
      }
    } catch (err) {
      if (err.message) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(500).json({ message: err });
      }
    }
  },

  // * for checking if the user is authenticated
  checkAuthController: function (req, res) {
    try {
      res.send(req.user);
    } catch (err) {
      res.send(err);
    }
  },
};
