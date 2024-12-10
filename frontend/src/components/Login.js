import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            throw new Error(data.error || 'Login failed');
          });
        return res.json();
      })
      .then((data) => {
        setAuthToken(data.token);
        navigate('/');
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
        <h2 className="auth-header">Login to Recipe Finder</h2>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleLogin}>
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
            Log In
          </button>
        </form>
        <p className="auth-footer">
          Don’t have an account?{' '}
          <Link to="/register" className="auth-link">
            Register here.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
