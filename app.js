require("dotenv").config();

// dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");

// middlewares
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");
const checkAuth = require("./middlewares/checkAuth");

// importing routes
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");
const reviewRouter = require("./routes/reviewRouter");
const checkoutRouter = require("./routes/checkoutRouter");

const app = express();
const port = process.env.PORT || 8000;

// app middlewares
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// database connection
const dbUrl =
  process.env.NODE_ENV === "development"
    ? "mongodb://localhost:27017/devr-commerce"
    : process.env.DB;
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("- Connected to database [MongoDB]"))
  .catch((err) => {
    console.log(err.message || err);
  });

// * application routes
// all the routes about authentication are here
app.use("/get_auth", authRouter);
// for handling all the user stuffs
app.use("/get_user", userRouter);
// for handling the product stuffs
app.use("/get_product", productRouter);
// for handling the cart stuffs
app.use("/get_cart", cartRouter);
// for handling the review stuffs
app.use("/get_review", reviewRouter);
// for handling checkout
app.use("/checkout", checkAuth, checkoutRouter);

// for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// error handlings
app.use(notFoundHandler);
app.use(errorHandler);

// starting the server
app.listen(port, () => console.log(`- Listening to port [${port}]`));
