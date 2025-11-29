import React from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Header.css';

function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <h1>Enhanced Counter Dashboard</h1>
      <ThemeToggle 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </header>
  );
}

export default Header;