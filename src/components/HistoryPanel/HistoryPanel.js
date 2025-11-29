import React from 'react';
import './HistoryPanel.css';

function HistoryPanel({ history, onResetAll }) {
  return (
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
        onClick={onResetAll}
        className="btn btn-warning"
        data-testid="reset-all-btn"
      >
        Reset Everything
      </button>
    </div>
  );
}

export default HistoryPanel;