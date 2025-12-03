import React, { useState } from 'react';
import './WeatherWidget.css';

function WeatherWidget({ weather, loading, city, onCitySearch, error }) {
  const [searchCity, setSearchCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      onCitySearch(searchCity.trim());
      setSearchCity('');
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Helper function to safely convert wind speed
  const getWindSpeed = () => {
    if (!weather || !weather.wind || weather.wind.speed == null) return 'N/A';
    
    const speed = Number(weather.wind.speed);
    if (isNaN(speed)) return 'N/A';
    
    return `${speed.toFixed(1)} m/s`;
  };

  // Helper function to safely get temperature
  const getTemperature = () => {
    if (!weather || !weather.main || weather.main.temp == null) return 'N/A';
    
    const temp = Number(weather.main.temp);
    if (isNaN(temp)) return 'N/A';
    
    return `${Math.round(temp)}°C`;
  };

  // Helper function to safely get feels like temperature
  const getFeelsLike = () => {
    if (!weather || !weather.main || weather.main.feels_like == null) return 'N/A';
    
    const temp = Number(weather.main.feels_like);
    if (isNaN(temp)) return 'N/A';
    
    return `${Math.round(temp)}°C`;
  };

  // Helper function to safely get visibility
  const getVisibility = () => {
    if (!weather || weather.visibility == null) return 'N/A';
    
    const vis = Number(weather.visibility);
    if (isNaN(vis)) return 'N/A';
    
    return `${(vis / 1000).toFixed(1)} km`;
  };

  if (loading) {
    return (
      <div className="weather-widget loading">
        <h3>Weather</h3>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="weather-widget">
        <h3>Weather</h3>
        <div className="weather-error">
          <p>Unable to fetch weather data</p>
          <p className="demo-notice">Try searching for a city</p>
          <form onSubmit={handleSubmit} className="weather-search">
            <input
              type="text"
              placeholder="Enter city name..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="weather-input"
            />
            <button type="submit" className="btn btn-small">
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <h3>Current Weather</h3>
      
      {error && (
        <div className="weather-alert">
          ⚠️ {error}
        </div>
      )}
      
      <div className="weather-header">
        <h4>{weather.name || city || 'Unknown Location'}</h4>
        <span className="weather-date">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      </div>

      <div className="weather-content">
        <div className="weather-main">
          <div className="temperature">
            <span className="temp-value">
              {getTemperature()}
            </span>
            <span className="temp-feels">
              Feels like: {getFeelsLike()}
            </span>
          </div>
          
          <div className="weather-icon">
            {weather.weather && weather.weather[0] && weather.weather[0].icon ? (
              <img 
                src={getWeatherIcon(weather.weather[0].icon)} 
                alt={weather.weather[0].description || 'Weather icon'}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://openweathermap.org/img/wn/01d@2x.png`;
                }}
              />
            ) : (
              <div className="weather-icon-placeholder">🌤️</div>
            )}
            <span className="weather-description">
              {weather.weather && weather.weather[0] ? 
                weather.weather[0].description : 
                'Weather data not available'}
            </span>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">
              {weather.main && weather.main.humidity != null ? 
                `${weather.main.humidity}%` : 'N/A'}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind</span>
            <span className="detail-value">{getWindSpeed()}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">
              {weather.main && weather.main.pressure != null ? 
                `${weather.main.pressure} hPa` : 'N/A'}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{getVisibility()}</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="weather-search">
        <input
          type="text"
          placeholder="Search another city..."
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          className="weather-input"
          data-testid="weather-search-input"
        />
        <button 
          type="submit" 
          className="btn btn-small"
          data-testid="weather-search-btn"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default WeatherWidget;