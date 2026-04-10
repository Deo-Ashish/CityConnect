const express = require("express");
const authController = require("../controllers/auth.controller.js");
const { authenticateToken } = require("../middleware/auth.middleware.js");

const router = express.Router();

// 🔐 Auth Routes
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/me", authenticateToken, authController.getProfile);

// ✅ Test route (prevents confusion / errors)
router.get("/", (req, res) => {
  res.send("Auth route working");
});

module.exports = router;