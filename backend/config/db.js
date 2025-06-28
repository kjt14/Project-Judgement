// Import Sequelize constructor from the sequelize package
const { Sequelize } = require('sequelize');

// Initialize a new Sequelize instance using the DB connection string from the .env file
// - process.env.DB_URI comes from the environment variable
// - dialect: 'postgres' tells Sequelize to use PostgreSQL as the database
const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres',
});

// Export the configured Sequelize instance so it can be used across the app (models, controllers, etc.)
module.exports = sequelize;
