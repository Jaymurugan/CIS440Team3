// src/components/RecipeDetail.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  // Inside useEffect in RecipeDetail.js
useEffect(() => {
  fetch(`/api/recipe/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((res) => {
      if (res.status === 401 || res.status === 403) {
        setAuthToken(null);
        navigate('/login');
        throw new Error('Unauthorized');
      }
      if (!res.ok) throw new Error('Failed to fetch recipe');
      return res.json();
    })
    .then((data) => setRecipe(data))
    .catch((err) => console.error('Error:', err));
}, [id, authToken, navigate, setAuthToken]);


  if (!recipe) return <div>Loading...</div>;

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
    </div>
  );
}

export default RecipeDetail;
