require('dotenv').config(); // ✅ Load environment variables first
const express = require('express');
const cors = require('cors');
const recRoutes = require('./api/routes/recommendation.routes');
const userRoutes = require('./api/routes/user.routes');
const swagger = require('./swagger/swagger');
const errorHandler = require('./api/middlewares/error.middleware');

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/recommendations', recRoutes);

// Swagger Docs
swagger(app);

// Global Error Handler
app.use(errorHandler);

module.exports = app; // ✅ Export app for use in server.js and testing
