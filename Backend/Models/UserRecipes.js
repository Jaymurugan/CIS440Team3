const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const UserRecipes = sequelize.define('UserRecipes', {
    recipe_id: {
        type: DataTypes.INTEGER,  // You can also use DataTypes.UUID if you want a UUID-based ID
        primaryKey: true,  // This is the primary key
        allowNull: false,
      },
    user_id: {
      type: DataTypes.STRING,  // Foreign key referring to user_id from the Users table
      allowNull: false,
    },
    recipe_data: {
      type: DataTypes.STRING,  // Store recipe data as a string (e.g., JSON or plain text)
      allowNull: false,
    },
  }, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
  });
  
  module.exports = UserRecipes;