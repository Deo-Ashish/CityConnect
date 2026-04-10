const categoryModel = require("../models/category.model");

// ➕ Create Category
async function createCategory(req, res) {
  try {
    const { name, icon, slug } = req.body;

    // check duplicate
    const exists = await categoryModel.findOne({
      $or: [{ name }, { slug }],
    });

    if (exists) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await categoryModel.create({
      name,
      icon,
      slug,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 📄 Get All Categories
async function getAllCategories(req, res) {
  try {
    const categories = await categoryModel.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// 🔍 Get Category by ID
async function getCategoryById(req, res) {
  try {
    const category = await categoryModel.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ✏️ Update Category
async function updateCategory(req, res) {
  try {
    const category = await categoryModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ❌ Delete Category
async function deleteCategory(req, res) {
  try {
    await categoryModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};