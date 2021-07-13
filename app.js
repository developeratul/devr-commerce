require("dotenv").config();

// dependencies
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");

// middlewares
const { notFoundHandler, errorHandler } = require("./middlewares/errorHandler");

// importing routes
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const cartRouter = require("./routes/cartRouter");

const app = express();
const port = process.env.PORT || 8000;

// app middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// database connection
const dbUrl = process.env.DB;
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("- Connected to database [MongoDB]"))
  .catch((err) => {
    if (err.message) {
      console.log(err.message);
    } else {
      console.log(err);
    }
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

// for production
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.header("x-forwarded-proto") !== "https")
      res.redirect(`https://${req.header("host")}${req.url}`);
    else next();
  });
}

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
