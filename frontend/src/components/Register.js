// frontend/src/components/Register.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((data) => { throw new Error(data.error || 'Registration failed'); });
        return res.json();
      })
      .then(() => {
        navigate('/login');
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>.
      </p>
    </div>
  );
}

export default Register;
