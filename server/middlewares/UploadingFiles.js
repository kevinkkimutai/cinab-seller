// middleware/UploadingFiles.js
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `file-${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /\.(jpeg|jpg|png|gif)$/i;

  // Check if the file has a valid extension
  if (allowedFileTypes.test(file.originalname)) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Please provide image files in the correct format")); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
