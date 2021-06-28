const bcrypt = require("bcrypt");

// models
const User = require("../models/users");

module.exports = {
  // * the registration controller
  registerUser: async function (req, res, next) {
    try {
      const { name, email, password, phone, country, isSeller } = req.body;

      // creating a new user instance
      const newUser = new User({
        name,
        email,
        password,
        country,
        phone,
        isSeller: isSeller === "true" ? true : false,
      });

      // checking if the user email already exists (line:23)
      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(403).json({ message: "Email already exists" });
      } else {
        // saving the user information's and handling error
        await newUser.save().catch((err) => {
          if (err.message) {
            next(err.message);
          } else {
            next(err);
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
        res
          .status(200)
          .json({ message: "Registration Successful", user: newUser });
      }
    } catch (err) {
      if (err.message) {
        res.status(500).json({ message: err.message });
      } else {
        res.status(500).json({ message: err });
      }
    }
  },

  // * for logging in a user
  loginUser: async function (req, res, next) {
    try {
      const { email, password } = req.body;

      // checking if email exists (line:68)
      if (email) {
        const emailOk = await User.findOne({ email });

        if (emailOk) {
          // checking if password is correct
          const passwordOk = await bcrypt.compare(password, emailOk.password);

          if (passwordOk) {
            const user = emailOk;

            // generate token and store cookie
            const token = await user.generateToken();
            res.cookie("auth", token, {
              expires: new Date().now + 25892000000,
              maxAge: 25892000000,
            });

            // if everything is okk send response with the user and the message
            res
              .status(201)
              .json({ user, message: `Welcome back ${user.name}` });
          } else if (!passwordOk) {
            res.status(409).json({ message: "Invalid credentials" });
          }
        } else if (!emailOk) {
          res.status(409).json({ message: "Your account doesn't exists" });
        }
      } else {
        res.status(409).json({ message: "Please enter your email" });
      }
    } catch (err) {
      if (err.message) {
        next(err.message);
      }

      next(err);
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

  // * for logging out a user
  logOutUser: function (req, res, next) {
    try {
      req.user.tokens = req.user.tokens.filter(
        ({ token }) => token !== req.token
      );
      res.clearCookie("auth");
      req.user.save((err) => {
        if (err) {
          next(err);
        } else {
          res.status(200).json({ message: `Logged out` });
        }
      });
    } catch (err) {
      res.send(err);
    }
  },
};
