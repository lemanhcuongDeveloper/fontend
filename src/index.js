import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './context/CartContext';

// Create a root element using React 18's createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app wrapped with CartProvider
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);

// To measure performance in the app, pass a function to log results
reportWebVitals();
