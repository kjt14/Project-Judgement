const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
const sequelize = require('./config/db');

// Routes (Week 1 only)
const authRoutes = require('./routes/authRoutes');
const telemetryRoutes = require('./routes/telemetryRoutes');

// Swagger setup (if used)
const { swaggerUi, specs } = require('./swagger');

// Error handler (if you've added one)
const errorHandler = require('./middlewares/errorHandler');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/telemetry', telemetryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware
app.use(errorHandler);

// DB Connect & Start Server
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL Connected');
    return sequelize.sync(); // Sync tables
  })
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('DB Connection Error:', err));

