import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.error || 'Registration failed');
          });
        return res.json();
      })
      .then(() => {
        navigate('/login');
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img
          src="/logo192.png"
          alt="Recipe Finder Logo"
          className="auth-logo"
        />
        <h2 className="auth-header">Create an Account</h2>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="auth-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
            required
          />
          <button type="submit" className="auth-button">
            Register
          </button>
        </form>
        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">
            Login here.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
