// src/main/index.js

const express = require('express');
const bodyParser = require('body-parser');
const { connectToDatabase } = require('./database');
const apiRoutes = require('./routes/api');
const config = require('./config');

const app = express();
const PORT = config.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database
connectToDatabase();

// API Routes
app.use('/api', apiRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`QPi-Stablecoin API is running on http://localhost:${PORT}`);
});
