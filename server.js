const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/api/userRoutes');
const thoughtRoutes = require('./routes/api/thoughtRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

// Mongoose connection
const connection = require('./config/connection'); 

connection.once('open', () => {
    console.log("MongoDB connection established successfully!");
    console.log('User Model imported in server.js:', require('./models/User')); // Log the User model here

    app.listen(PORT, () => {
        console.log(`API server now listening on port ${PORT}`);
    });
});

// Mount routes
app.use('/api/users', userRoutes); 
app.use('/api/thoughts', thoughtRoutes); 


