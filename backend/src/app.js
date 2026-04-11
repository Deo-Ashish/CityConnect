import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from './routes/auth.routes.js';
import businessRoutes from './routes/business.routes.js';
import reviewRoutes from './routes/review.routes.js';
import searchRoutes from './routes/search.routes.js';
import categoryRoutes from './routes/category.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong!' });
});

export default app;
