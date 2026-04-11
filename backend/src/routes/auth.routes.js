<<<<<<< HEAD
const express = require("express");
const authController = require("../controllers/auth.controller.js");
const { authenticateToken } = require("../middleware/auth.middleware.js");

const router = express.Router();

// 🔐 Auth Routes
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/me", authenticateToken, authController.getProfile);
=======
import express from 'express';
import { register, login, getMe, makeAdmin } from '../controllers/auth.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/make-admin', protect, makeAdmin); // Backdoor to grant admin access for setup
>>>>>>> 9abce5f (code written again)

export default router;
