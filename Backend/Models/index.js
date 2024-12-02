// backend/models/index.js
const { Sequelize } = require('sequelize');

// Load environment variables
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'recipe_app',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  }
);

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log('Connected to MySQL database'))
  .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;

// After module.exports = sequelize;

const User = require('./User'); // Import the User model

// Sync models with the database
sequelize
  .sync()
  .then(() => console.log('Database & tables created!'))
  .catch((err) => console.error('Error creating database tables:', err));

module.exports = {
  sequelize,
  User,
};
