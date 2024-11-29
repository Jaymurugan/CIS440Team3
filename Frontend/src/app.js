// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchBar from './Components/searchbar';
import RecipeList from './Components/recipelist';
import RecipeDetail from './Components/recipedetail';

function App() {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = (query) => {
    fetch(`/api/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error('Error:', err));
  };

  return (
    <div>
      <h1>Recipe Finder</h1>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar onSearch={handleSearch} />
              <RecipeList recipes={recipes} />
            </>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </div>
  );
}

export default App;
