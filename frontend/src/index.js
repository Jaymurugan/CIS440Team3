// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Update the import
import { BrowserRouter } from 'react-router-dom';
import App from './app';
import './index.css';
import AuthProvider from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
