import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.route.js';

dotenv.config();

// Ensure MONGO environment variable exists
if (!process.env.MONGO) {
    console.error("❌ Missing MONGO connection string in .env file.");
    process.exit(1);
}

// MongoDB Connection
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("✅ Connected to MongoDB.");
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
        process.exit(1);
    });

const app = express();
app.use(express.json()); // Parse JSON requests

// Define Routes
app.use('/api/auth', authRouter);

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Allows access from VPN/local network

app.listen(PORT, HOST, () => {
    console.log(`🚀 Server is running on http://${HOST}: port ${PORT}`);
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    console.error(`❌ Error: ${message}`);
    
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
