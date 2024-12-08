import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext

function RecipeDetail() {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null); // State for storing the recipe data
  const [isSaved, setIsSaved] = useState(false); // Track if the recipe is already saved
  const { authToken, setAuthToken } = useContext(AuthContext); // Get authToken from context
  const navigate = useNavigate(); // To navigate programmatically

  // Fetch recipe details when the component mounts or when the `id` or `authToken` changes
  useEffect(() => {
    if (!authToken) {
      navigate('/login'); // Redirect to login if there's no authToken
      return;
    }

    fetch(`/api/recipe/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Include the authToken in the Authorization header
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          setAuthToken(null); // Clear the token if unauthorized
          navigate('/login'); // Redirect to login page
          throw new Error('Unauthorized');
        }
        if (!res.ok) throw new Error('Failed to fetch recipe');
        return res.json();
      })
      .then((data) => setRecipe(data)) // Update the state with the recipe data
      .catch((err) => console.error('Error:', err));
  }, [id, authToken, navigate, setAuthToken]); // Dependency array

  // Function to save the recipe to the user's saved recipes
  const saveRecipe = async () => {
    try {
      const response = await fetch(`/api/recipe/${id}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Include the authToken in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Failed to save recipe');
      }

      const data = await response.json();
      console.log('Recipe saved:', data);
      setIsSaved(true); // Update the UI to reflect that the recipe is saved
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  if (!recipe) return <div>Loading...</div>; // Show loading state while fetching

  return (
    <div>
      <Link to="/">← Back to Search</Link>
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <h3>Ingredients:</h3>
      <ul>
        {recipe.extendedIngredients.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>
      <h3>Instructions:</h3>
      {recipe.instructions ? (
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      ) : (
        <p>No instructions available.</p>
      )}
      
      {/* Save Button */}
      <button onClick={saveRecipe} disabled={isSaved}>
        {isSaved ? 'Recipe Saved' : 'Save Recipe'} {/* Change text based on saved state */}
      </button>
    </div>
  );
}

export default RecipeDetail;