const express = require("express");
const propertyController = require("../controllers/property.controller");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();

router.post("/upload",upload.single("property"), propertyController.createProperty);

module.exports = router;
