import React from 'react';
import './ThemeToggle.css';

function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <div className="theme-toggle">
      <label className="switch">
        <input 
          type="checkbox" 
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          data-testid="theme-toggle"
        />
        <span className="slider round"></span>
      </label>
      <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
    </div>
  );
}

export default ThemeToggle;