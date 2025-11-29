import React, { useState } from 'react';
import Header from './components/Header/Header';
import CounterDisplay from './components/CounterDisplay/CounterDisplay';
import StepControl from './components/StepControl/StepControl';
import Favorites from './components/Favorites/Favorites';
import HistoryPanel from './components/HistoryPanel/HistoryPanel';
import Statistics from './components/Statistics/Statistics';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);

  const addToHistory = (action, value) => {
    setHistory(prev => [
      { action, value, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 9)
    ]);
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
        <Header 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
        />
        
        <div className="dashboard">
          <div className="counter-section">
            <CounterDisplay 
              count={count}
              step={step}
              onIncrement={() => {
                const newCount = count + step;
                setCount(newCount);
                addToHistory(`Incremented by ${step}`, newCount);
              }}
              onDecrement={() => {
                const newCount = count - step;
                setCount(newCount);
                addToHistory(`Decremented by ${step}`, newCount);
              }}
              onReset={() => {
                setCount(0);
                addToHistory('Reset counter', 0);
              }}
            />
            
            <StepControl 
              step={step}
              setStep={setStep}
            />
            
            <Favorites 
              count={count}
              favorites={favorites}
              setFavorites={setFavorites}
              onLoadFavorite={(value) => {
                setCount(value);
                addToHistory(`Loaded favorite`, value);
              }}
            />
          </div>

          <HistoryPanel 
            history={history}
            onResetAll={resetAll}
          />
        </div>

        <Statistics 
          count={count}
          step={step}
          favoritesCount={favorites.length}
          historyCount={history.length}
        />
      </div>
    </div>
  );
}

export default App;