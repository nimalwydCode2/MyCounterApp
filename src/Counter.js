import React, { useState, useEffect } from 'react';

function EnhancedCounter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [name, setName] = useState('');
  const [favorites, setFavorites] = useState([]);

  const increment = () => {
    const newCount = count + step;
    setCount(newCount);
    addToHistory(`Incremented by ${step}`, newCount);
  };

  const decrement = () => {
    const newCount = count - step;
    setCount(newCount);
    addToHistory(`Decremented by ${step}`, newCount);
  };

  const addToHistory = (action, value) => {
    setHistory(prev => [
      { action, value, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 9) // Keep only last 10 items
    ]);
  };

  const saveFavorite = () => {
    if (name.trim()) {
      setFavorites(prev => [...prev, { name: name.trim(), value: count }]);
      setName('');
    }
  };

  const loadFavorite = (value) => {
    setCount(value);
    addToHistory(`Loaded favorite`, value);
  };

  const resetAll = () => {
    setCount(0);
    setStep(1);
    setHistory([]);
    setFavorites([]);
    addToHistory('Reset all', 0);
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <div className="container">
        {/* Header Section */}
        <header className="header">
          <h1>Enhanced Counter Dashboard</h1>
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
        </header>

        <div className="dashboard">
          {/* Main Counter Section */}
          <div className="counter-section">
            <div className="counter-display">
              <h2 data-testid="counter-value">{count}</h2>
              <div className="counter-buttons">
                <button 
                  onClick={decrement}
                  data-testid="decrement-btn"
                  className="btn btn-danger"
                >
                  -{step}
                </button>
                <button 
                  onClick={increment}
                  data-testid="increment-btn"
                  className="btn btn-success"
                >
                  +{step}
                </button>
                <button 
                  onClick={() => setCount(0)}
                  data-testid="reset-btn"
                  className="btn btn-primary"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Step Control */}
            <div className="control-panel">
              <h3>Step Control</h3>
              <div className="step-controls">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={step}
                  onChange={(e) => setStep(parseInt(e.target.value))}
                  className="slider-control"
                  data-testid="step-slider"
                />
                <span className="step-value">Step: {step}</span>
                <div className="quick-steps">
                  {[1, 2, 5, 10].map(value => (
                    <button
                      key={value}
                      onClick={() => setStep(value)}
                      className={`btn btn-outline ${step === value ? 'active' : ''}`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Favorites Section */}
            <div className="favorites-section">
              <h3>Save Favorites</h3>
              <div className="favorite-input">
                <input
                  type="text"
                  placeholder="Name this value..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="favorite-input"
                  className="text-input"
                />
                <button 
                  onClick={saveFavorite}
                  className="btn btn-secondary"
                  data-testid="save-favorite-btn"
                >
                  Save
                </button>
              </div>
              <div className="favorites-list">
                {favorites.map((fav, index) => (
                  <div key={index} className="favorite-item">
                    <span>{fav.name}: {fav.value}</span>
                    <button 
                      onClick={() => loadFavorite(fav.value)}
                      className="btn btn-small"
                    >
                      Load
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* History Panel */}
          <div className="history-panel">
            <h3>Operation History</h3>
            <div className="history-list">
              {history.map((entry, index) => (
                <div key={index} className="history-item">
                  <span className="action">{entry.action}</span>
                  <span className="value">→ {entry.value}</span>
                  <span className="timestamp">{entry.timestamp}</span>
                </div>
              ))}
              {history.length === 0 && (
                <div className="empty-state">No operations yet</div>
              )}
            </div>
            <button 
              onClick={resetAll}
              className="btn btn-warning"
              data-testid="reset-all-btn"
            >
              Reset Everything
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="stats">
          <div className="stat-card">
            <h4>Current Value</h4>
            <span className="stat-value">{count}</span>
          </div>
          <div className="stat-card">
            <h4>Step Size</h4>
            <span className="stat-value">{step}</span>
          </div>
          <div className="stat-card">
            <h4>Favorites</h4>
            <span className="stat-value">{favorites.length}</span>
          </div>
          <div className="stat-card">
            <h4>History Items</h4>
            <span className="stat-value">{history.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EnhancedCounter;