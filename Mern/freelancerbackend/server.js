require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); // MongoDB connection setup

// Route handlers
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware to parse incoming JSON
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/jobs', jobRoutes);  // Job posting routes

// Root route
app.get('/', (req, res) => {
  res.send('✅ API is running successfully');
});

// Global error handler (optional but helpful)
app.use((err, req, res, next) => {
  console.error('❌ Global error handler:', err.stack);
  res.status(500).json({ message: 'Something broke!', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at: \x1b[36mhttp://localhost:${PORT}\x1b[0m`);
});
