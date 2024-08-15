require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require('jsonwebtoken'); // Import JWT for authentication
const userRoutes = require('./routes/users');
const authRoutes = require("./routes/auth");
const router = express.Router();

const app = express();

// Middleware
app.use(cors({
    origin:["https://trenthackathon-backend.vercel.app/"],
    methods: ["POST", "GET"],
    credentials:true
}));
app.use(express.json()); // In case you need to handle JSON payloads

// MongoDB URI
const uri = process.env.MONGODB_URI || "mongodb+srv://Kaushik:omsai123@trenthackathon.nwtrs.mongodb.net/?retryWrites=true&w=majority&appName=TrentHackathon";

async function connect() {
    try {
        await mongoose.connect(uri); // No need for useNewUrlParser or useUnifiedTopology
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1); // Exit the process with failure if connection fails
    }
}

// Start the MongoDB connection
connect();

// Middleware to verify JWT and extract user ID (if using JWT)
function authenticateToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded; // Attach the decoded token (user id) to the request object
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
}



// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!'); // You can send HTML, JSON, or render a template
});

// Start the server
app.listen(8000, () => {
    console.log("Server is running on port 8000");
});


module.exports = app;