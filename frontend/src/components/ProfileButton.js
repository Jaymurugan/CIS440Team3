import React, { useState, useEffect } from 'react';

const ProfileButton = ({ authToken, onLogout, onNavigateToSavedRecipes }) => {
  const [username, setUsername] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch the username from the backend
    const fetchUsername = async () => {
      try {
        const response = await fetch('/api/username', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch username');
        }

        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    fetchUsername();
  }, [authToken]);

  // Toggle the dropdown menu
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  // Handle clicking on "Saved Recipes"
  const handleSavedRecipesClick = () => {
    onNavigateToSavedRecipes();  // Call parent function to navigate to saved recipes
    setIsDropdownOpen(false);    // Close dropdown after selection
  };

  // Handle logging out
  const handleLogout = () => {
    onLogout();  // Call parent function to handle logout logic
    setIsDropdownOpen(false); // Close dropdown after logout
  };

  return (
    <div className="profile-button">
      <button onClick={toggleDropdown} className="profile-button__icon">
        <img
          src="https://via.placeholder.com/40" // Default profile image (you can replace it with an actual image)
          alt="Profile"
          className="profile-button__image"
        />
        <span className="profile-button__username">{username || 'Loading...'}</span>
      </button>

      {isDropdownOpen && (
        <div className="profile-button__dropdown">
          <button onClick={handleSavedRecipesClick} className="dropdown-item">
            Saved Recipes
          </button>
          <button onClick={handleLogout} className="dropdown-item">
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;