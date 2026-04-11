import express from 'express';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { 
  getAllUsers, updateUserRole, deleteUser,
  deleteBusinessAsAdmin, 
  createCategory, updateCategory, deleteCategory
} from '../controllers/admin.controller.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin')); // All routes below are restricted to admin

// Users
router.route('/users')
  .get(getAllUsers);
router.route('/users/:id')
  .put(updateUserRole)
  .delete(deleteUser);

// Businesses
router.route('/business/:id')
  .delete(deleteBusinessAsAdmin);

// Categories
router.route('/categories')
  .post(createCategory);
router.route('/categories/:id')
  .put(updateCategory)
  .delete(deleteCategory);

export default router;
