import React, { useState, useEffect } from 'react';
import './Settings.css';

function Settings() {
  // Initialise dark mode state from localStorage (if available)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  // Update document body and localStorage whenever darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div className="settings">
      <h1>App Settings</h1>
      <div className="setting-item">
        <label>
          Dark Mode:
          <input 
            type="checkbox" 
            checked={darkMode} 
            onChange={() => setDarkMode(!darkMode)} 
          />
        </label>
      </div>
    </div>
  );
}

export default Settings;