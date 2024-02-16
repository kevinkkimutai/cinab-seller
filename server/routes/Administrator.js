const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middlewares/UploadingFiles");
const administratorController = require("../controllers/AdministratorController");

router.post(
  "/administrators",
  uploadMiddleware.single("image"),
  administratorController.create
);


router.get("/administrators", administratorController.read);
router.put("/administrators/:id", administratorController.update);
router.delete("/administrators/:id", administratorController.delete);

module.exports = router;
