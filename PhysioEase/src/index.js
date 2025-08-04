import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

const darkMode = JSON.parse(localStorage.getItem('darkMode'));
if (darkMode) {
  document.body.classList.add('dark-mode');
}