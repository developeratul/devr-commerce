const jwt = require("jsonwebtoken");
const User = require("../models/users");

const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies.auth;
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: verifyToken.id }).populate(
      "products"
    );

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({ message: "You are not logged in" });
  }
};

module.exports = checkAuth;
