const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/category.controller");

// ---------------------- ROUTES ---------------------- //

// ➕ Create Category
router.post("/", categoryController.createCategory);

// 📄 Get All Categories
router.get("/", categoryController.getAllCategories);

// 🔍 Get Single Category
router.get("/:id", categoryController.getCategoryById);

// ✏️ Update Category
router.put("/:id", categoryController.updateCategory);

// ❌ Delete Category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;