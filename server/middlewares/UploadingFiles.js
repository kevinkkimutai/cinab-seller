const path = require("path");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads"); // Adjust the path accordingly
    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `file-${Date.now()}.${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|pdf|svg|doc|docx|csv/;
  const mimeType = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));

  if (mimeType && extname) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Please provide files in the correct format")); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
