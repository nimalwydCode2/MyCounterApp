import React from 'react';
import './Statistics.css';

function Statistics({ count, step, favoritesCount, historyCount }) {
  const stats = [
    { label: 'Current Value', value: count },
    { label: 'Step Size', value: step },
    { label: 'Favorites', value: favoritesCount },
    { label: 'History Items', value: historyCount }
  ];

  return (
    <div className="stats">
      {stats.map((stat, index) => (
        <div key={index} className="stat-card">
          <h4>{stat.label}</h4>
          <span className="stat-value">{stat.value}</span>
        </div>
      ))}
    </div>
  );
}

export default Statistics;