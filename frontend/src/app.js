// src/App.js
import React, { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SearchBar from './components/Searchbar';
import RecipeList from './components/recipelist';
import RecipeDetail from './components/recipedetail';
import Register from './components/Register';
import Login from './components/Login';
import { AuthContext } from './context/AuthContext';
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

  return (
    <div>
      <h1>Recipe Finder</h1>
      {authToken && <button onClick={handleLogout} className="logout-button">Logout</button>}
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

