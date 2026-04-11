import User from '../models/User.js';
import Business from '../models/Business.js';
import Category from '../models/Category.js';
import Review from '../models/Review.js';

// --- USER MANAGEMENT ---
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.role = role;
    await user.save();
    res.status(200).json({ message: 'User role updated', user: { _id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    
    // Cascade delete business and reviews
    const userBusinesses = await Business.find({ owner: user._id });
    for (const b of userBusinesses) {
        await Review.deleteMany({ business: b._id });
    }
    await Business.deleteMany({ owner: user._id });
    await Review.deleteMany({ user: user._id });
    
    await user.deleteOne();
    res.status(200).json({ message: 'User and their related data removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// --- BUSINESS MANAGEMENT ---
export const deleteBusinessAsAdmin = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (!business) return res.status(404).json({ message: 'Business not found' });
    
    await Review.deleteMany({ business: req.params.id }); 
    await business.deleteOne();
    res.status(200).json({ message: 'Business removed by Admin' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// --- CATEGORY MANAGEMENT ---
export const createCategory = async (req, res) => {
  try {
    const { name, icon, slug } = req.body;
    const category = await Category.create({ name, icon, slug });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
