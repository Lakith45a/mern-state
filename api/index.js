import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import path from "path";

dotenv.config();

// Ensure MONGO environment variable exists
if (!process.env.MONGO) {
  console.error("❌ Missing MONGO connection string in .env file.");
  process.exit(1);
}

// MongoDB Connection
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("✅ Connected to MongoDB.");
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

const _dirname = path.resolve();

const app = express();

// Middleware - ORDER MATTERS!
app.use(express.json()); // Parse JSON requests
app.use(cookieParser()); // Move cookie parser BEFORE routes

// Define Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/listing", listingRouter);

// Only serve static files in production (not on Vercel serverless)
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  app.use(express.static(path.join(_dirname, "client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
  });
}

// Global Error Handler Middleware (must be AFTER routes)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error(`❌ Error: ${message}`);

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Export for Vercel serverless
export default app;

// Only start server locally (not on Vercel)
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  const HOST = "0.0.0.0"; // Allows access from VPN/local network

  app.listen(PORT, HOST, () => {
    console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
  });
}
