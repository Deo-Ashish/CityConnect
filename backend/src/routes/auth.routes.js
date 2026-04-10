const express = require("express");
const authController = require("../controllers/auth.controller.js");

const router = express.Router();

// 🔐 Auth Routes
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

// ✅ Test route (prevents confusion / errors)
router.get("/", (req, res) => {
  res.send("Auth route working");
});

module.exports = router;