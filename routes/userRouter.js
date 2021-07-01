const express = require("express");
const router = express();
const checkAuth = require("../middlewares/checkAuth");

// utils
const multer = require("../utils/multer");

// controllers
const { getUser, uploadAvatar } = require("../controllers/userController");

// for getting the data of a user according to the id
router.get("/user_id/:id", getUser);

// for uploading an avatar of a user
// ! the user cannot upload anything till he logs in
router.post("/upload_avatar", multer.single("image"), uploadAvatar);

module.exports = router;
