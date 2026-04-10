const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db");

const authRoutes = require("./routes/auth.routes");
const businessRoutes = require("./routes/business.routes");
const reviewRoutes = require("./routes/review.routes");
const categoryRoutes = require("./routes/category.routes");

const app = express();

// ✅ connect database
connectDB();

// ✅ middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ routes
app.use("/api/auth", authRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/category", categoryRoutes);

// ✅ test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;