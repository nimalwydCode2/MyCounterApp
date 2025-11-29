import React, { useState } from 'react';
import './Favorites.css';

function Favorites({ count, favorites, setFavorites, onLoadFavorite }) {
  const [name, setName] = useState('');

  const saveFavorite = () => {
    if (name.trim()) {
      setFavorites(prev => [...prev, { name: name.trim(), value: count }]);
      setName('');
    }
  };

  return (
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
              onClick={() => onLoadFavorite(fav.value)}
              className="btn btn-small"
            >
              Load
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;