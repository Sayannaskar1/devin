// backend/app.js
import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// --- IMPORTANT: Import your Mongoose models ---
import userModel from './models/user.model.js';
import projectModel from './models/project.model.js';

// --- Multer config for file uploads (COMMENTED OUT BY DEFAULT) ---
// If you want file uploads/profile pictures, uncomment these lines
// and ensure config/multer.js exists and is correct.
// import upload from './config/multer.js';

// --- Route imports ---
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import aiRoutes from './routes/ai.routes.js';

// --- Middleware for Authentication Check ---
import { authUser } from './middleware/auth.middleware.js';

// --- AI Service Initialization (called from server.js) ---
// import { initializeAIModel } from './services/ai.service.js'; // Not called directly here

// --- DB Connection Utility (called from server.js) ---
// import connectDB from './db/db.js'; // Not called directly here

// --- Express App Setup ---
const app = express();

// --- Middleware ---
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- Static files (COMMENTED OUT BY DEFAULT) ---
// If you have ANY static files (like default avatars) served by backend, uncomment this.
// Otherwise, remove it and the path/fileURLToPath imports.
// import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// app.use(express.static(path.join(__dirname, 'public')));


// --- Routes ---
app.use('/users', userRoutes);
app.use('/projects', projectRoutes);
app.use("/ai", aiRoutes);

// Root route - for frontend to hit or simple backend message
app.get('/', (req, res) => {
    res.send('Devin Backend API is running!');
});

// Example of a protected backend route (for testing if needed)
app.get('/dashboard-backend-view', authUser, (req, res) => {
    res.send(`Welcome to the backend dashboard view, ${req.user.email}!`);
});


// --- Error Handling Middleware ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke on the server!');
});

// REMOVED: connect() call and initializeAIModel() call from here
// These are now handled in server.js

export default app; // Export the Express app instance
