// backend/server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Get the API key from environment variables
const API_KEY = process.env.SPOONACULAR_API_KEY;

// Route for searching recipes
app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  try {
    const response = await axios.get(
      'https://api.spoonacular.com/recipes/complexSearch',
      {
        params: {
          apiKey: API_KEY,
          query,
          number: 10,
        },
      }
    );
    res.json(response.data.results);
  } catch (error) {
    console.error('Error fetching recipes:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Error fetching recipes',
      details: error.response?.data || error.message,
    });
  }
});


// Route for getting recipe details
app.get('/api/recipe/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information`,
      {
        params: {
          apiKey: API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipe details:', error.message);
    res.status(500).json({ error: 'Error fetching recipe details' });
  }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
