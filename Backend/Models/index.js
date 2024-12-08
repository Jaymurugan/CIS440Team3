// Load environment variables
require('dotenv').config();

const { Sequelize } = require('sequelize');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // Path to the SQLite database file
});

module.exports = sequelize;

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log('Connected to MySQL database'))
  .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;

// After module.exports = sequelize;

const User = require('./User'); // Import the User model
const UserRecipes = require('./UserRecipes');

// Define associations
User.hasOne(UserRecipes, {
  foreignKey: 'user_id',  // This is the foreign key in UserRecipes that refers to User
  onDelete: 'CASCADE',    // If the user is deleted, delete the associated UserRecipe as well
});

// One-to-one relationship: A UserRecipe belongs to a User
UserRecipes.belongsTo(User, {
  foreignKey: 'user_id',  // This is the foreign key in UserRecipes that refers to User
  onDelete: 'CASCADE',    // If the user is deleted, delete the associated UserRecipe as well
});

// Sync models with the database
sequelize
  .sync()
  .then(() => console.log('Database & tables created!'))
  .catch((err) => console.error('Error creating database tables:', err));

module.exports = {
  sequelize,
  User,
};
