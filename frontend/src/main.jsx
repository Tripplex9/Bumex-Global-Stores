import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import '../index.css'; // Corrected to move up to frontend root;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
