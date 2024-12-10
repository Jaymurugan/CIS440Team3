import React, { useState, useContext, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { authToken, setAuthToken } = useContext(AuthContext);

  const fetchRecipes = async (query) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        setAuthToken(null);
        throw new Error('Unauthorized. Redirecting to login.');
      }

      if (!response.ok) {
        throw new Error('Failed to fetch recipes.');
      }

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
      setErrorMessage(error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    if (query.trim() === '') {
      setErrorMessage('Please enter a search term.');
      setRecipes([]);
      return;
    }
    fetchRecipes(query);
  };

  const handleFilter = (filter) => {
    fetchRecipes(filter); // Use the filter keyword for fetching recipes
  };

  const handleLogout = () => {
    setAuthToken(null);
  };

  useEffect(() => {
    if (authToken) {
      fetchRecipes('default');
    }
  }, [authToken]);

  return (
    <div className="app-container">
      {authToken && (
        <div className="profile-button-wrapper">
          <ProfileButton
            authToken={authToken}
            onLogout={handleLogout}
            onNavigateToSavedRecipes={() => fetchRecipes('saved')}
          />
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            authToken ? (
              <>
                <header className="welcome-banner">
                  <h1 className="welcome-title">Welcome to Recipe Finder!</h1>
                  <p className="welcome-tagline">Discover recipes for every craving.</p>
                </header>
                <div className="search-section">
                  <SearchBar onSearch={handleSearch} />
                  <div className="search-filters">
                    <button
                      className="filter-button"
                      onClick={() => handleFilter('Vegetarian')}
                    >
                      Vegetarian
                    </button>
                    <button
                      className="filter-button"
                      onClick={() => handleFilter('Desserts')}
                    >
                      Desserts
                    </button>
                    <button
                      className="filter-button"
                      onClick={() => handleFilter('Quick Meals')}
                    >
                      Quick Meals
                    </button>
                  </div>
                </div>
                <main>
                  {loading ? (
                    <div className="loading-message">Loading recipes...</div>
                  ) : errorMessage ? (
                    <div className="error-message">{errorMessage}</div>
                  ) : recipes.length > 0 ? (
                    <RecipeList recipes={recipes} />
                  ) : (
                    <div className="empty-state">
                      <p className="empty-message">
                        No results yet! Try searching for something delicious.
                      </p>
                    </div>
                  )}
                </main>
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
