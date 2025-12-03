import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import CounterDisplay from './components/CounterDisplay/CounterDisplay';
import StepControl from './components/StepControl/StepControl';
import Favorites from './components/Favorites/Favorites';
import HistoryPanel from './components/HistoryPanel/HistoryPanel';
import Statistics from './components/Statistics/Statistics';
import WeatherWidget from './components/WeatherWidget/WeatherWidget';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState('London');
  const [error, setError] = useState('');

  // Add to history function
  const addToHistory = (action, value) => {
    setHistory(prev => [
      { action, value, timestamp: new Date().toLocaleTimeString() },
      ...prev.slice(0, 9) // Keep only last 10 items
    ]);
  };

  // Fetch weather data - SIMPLIFIED VERSION WITH MOCK DATA
  const fetchWeather = async (cityName = 'London') => {
    try {
      setLoading(true);
      setError('');
      
      // Try using OpenWeatherMap API if you have a key
      const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
      
      if (apiKey && apiKey !== 'your_api_key_here') {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
        );
        
        if (response.ok) {
          const data = await response.json();
          setWeather(data);
          addToHistory(`Fetched weather for ${cityName}`, count);
          return;
        }
      }
      
      // If no API key or API fails, use mock data
      setWeather(getMockWeather(cityName));
      addToHistory(`Fetched mock weather for ${cityName}`, count);
      
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('Using demo weather data');
      setWeather(getMockWeather(cityName));
      addToHistory(`Fetched mock weather for ${cityName}`, count);
    } finally {
      setLoading(false);
    }
  };

  // Mock weather data for demo/testing
  const getMockWeather = (cityName) => {
    const descriptions = ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy', 'Clear', 'Windy'];
    const icons = ['01d', '02d', '03d', '04d', '09d', '10d', '11d', '13d', '50d'];
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    
    const mockData = {
      name: cityName,
      sys: { country: cityName === 'London' ? 'GB' : 'US' },
      main: {
        temp: Math.floor(Math.random() * 30) + 10, // 10-40°C
        feels_like: Math.floor(Math.random() * 30) + 10,
        humidity: Math.floor(Math.random() * 50) + 30, // 30-80%
        pressure: Math.floor(Math.random() * 100) + 1000 // 1000-1100 hPa
      },
      weather: [
        {
          description: randomDesc,
          icon: randomIcon
        }
      ],
      wind: { 
        speed: (Math.random() * 10 + 1).toFixed(1) // 1-11 m/s
      },
      visibility: Math.floor(Math.random() * 5000) + 5000 // 5-10km
    };
    
    return mockData;
  };

  // Fetch weather on component mount
  useEffect(() => {
    fetchWeather();
  }, []);

  const resetAll = () => {
    setCount(0);
    setStep(1);
    setHistory([]);
    setFavorites([]);
    addToHistory('Reset all', 0);
  };

  const handleCitySearch = (cityName) => {
    setCity(cityName);
    fetchWeather(cityName);
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

          <div className="right-panel">
            <WeatherWidget 
              weather={weather}
              loading={loading}
              city={city}
              onCitySearch={handleCitySearch}
              error={error}
            />
            
            <HistoryPanel 
              history={history}
              onResetAll={resetAll}
            />
          </div>
        </div>

        <Statistics 
          count={count}
          step={step}
          favoritesCount={favorites.length}
          historyCount={history.length}
          temperature={weather?.main?.temp}
        />
      </div>
    </div>
  );
}

export default App;