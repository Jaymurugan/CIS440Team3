// src/components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What are you craving?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">Find Recipes</button>
    </form>
  );
}

export default SearchBar;
