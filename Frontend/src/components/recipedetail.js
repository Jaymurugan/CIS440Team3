// src/components/RecipeDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`/api/recipe/${id}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data))
      .catch((err) => console.error('Error:', err));
  }, [id]);

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
