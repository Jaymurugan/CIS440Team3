// src/App.js
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SearchBar from './components/Searchbar';
import RecipeList from './components/recipelist';
import RecipeDetail from './components/recipedetail';
import Register from './components/Register';
import Login from './components/Login';
import { AuthContext } from './context/AuthContext';
import ProfileButton from './components/ProfileButton';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const { authToken, setAuthToken } = useContext(AuthContext);

  const handleSearch = (query) => {
    fetch(`/api/search?query=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          setAuthToken(null);
          throw new Error('Unauthorized');
        }
        if (!res.ok) throw new Error('Search failed');
        return res.json();
      })
      .then((data) => setRecipes(data))
      .catch((err) => console.error('Error:', err));
  };

  const handleLogout = () => {
    setAuthToken(null);
  };

  const handleNavigateToSavedRecipes = () => {
    fetch('/api/recipes', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })  // Make a GET request to the /api/recipes route
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch saved recipes');
        }
        return response.json();  // Parse the response as JSON
      })
      .then((data) => {
        setRecipes(data);  // Update the recipes state with the fetched data
      })
      .catch((error) => {
        console.error('Error fetching saved recipes:', error);
      });
  };

  return (
    <div>
      {authToken && (
        <div className="profile-button-wrapper">
          <ProfileButton
            authToken={authToken}
            onLogout={handleLogout}
            onNavigateToSavedRecipes={handleNavigateToSavedRecipes}
          />
        </div>
      )}
      <h1>Recipe Finder</h1>
      <Routes>
        <Route
          path="/"
          element={
            authToken ? (
              <>
                <SearchBar onSearch={handleSearch} />
                <RecipeList recipes={recipes}  />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/recipe/:id"
          element={authToken ? <RecipeDetail /> : <Navigate to="/login" />}
        />
        <Route
          path="/register"
          element={authToken ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={authToken ? <Navigate to="/" /> : <Login />}
        />
      </Routes>
    </div>
  );
}

export default App;

