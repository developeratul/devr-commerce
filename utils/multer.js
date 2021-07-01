const multer = require("multer");
const path = require("path");

// we will accept png jpg and jpeg file type format

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    // If the file format is not accepted
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"));
    }

    // if file format is accepted
    cb(null, true);
  },
});
