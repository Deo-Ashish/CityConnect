<<<<<<< HEAD
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./db/db");
=======
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
>>>>>>> 9abce5f (code written again)

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
<<<<<<< HEAD
app.use(cookieParser());
=======
app.use(helmet());
app.use(morgan('dev'));
>>>>>>> 9abce5f (code written again)

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
