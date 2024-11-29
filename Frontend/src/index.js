// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Update the import
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Use createRoot
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
