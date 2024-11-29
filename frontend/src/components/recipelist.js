// src/components/RecipeList.js
import React from 'react';
import { Link } from 'react-router-dom';

function RecipeList({ recipes }) {
  if (!recipes.length) {
    return <p>No recipes found. Try searching for something else!</p>;
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <Link to={`/recipe/${recipe.id}`}>
            <h3>{recipe.title}</h3>
            <img src={recipe.image} alt={recipe.title} />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
