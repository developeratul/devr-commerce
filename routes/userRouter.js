const express = require("express");
const router = express();
const checkAuth = require("../middlewares/checkAuth");

// utils
const multer = require("../utils/multer");

// controllers
const { getUser, uploadAvatar } = require("../controllers/userController");
const { updateAccountInformation } = require("../controllers/userController");
const { updateSecurityInformation } = require("../controllers/userController");
const { followUser, unFollowUser } = require("../controllers/userController");

// for getting the data of a user according to the id
router.get("/user_id/:id", getUser);

// for uploading an avatar of a user
// ! the user cannot upload anything till he logs in
router.post("/upload_avatar", checkAuth, multer.single("image"), uploadAvatar);

// for updating the account information of a user
router.post("/update_account_information", checkAuth, updateAccountInformation);

// for updating the security information
router.post(
  "/update_security_information",
  checkAuth,
  updateSecurityInformation
);

// for following a user
router.post("/follow_user", checkAuth, followUser);

// for unFollowing a user
router.post("/unfollow_user", checkAuth, unFollowUser);

module.exports = router;
