import React from 'react';
import './CounterDisplay.css';

function CounterDisplay({ count, step, onIncrement, onDecrement, onReset }) {
  return (
    <div className="counter-display">
      <h2 data-testid="counter-value">{count}</h2>
      <div className="counter-buttons">
        <button 
          onClick={onDecrement}
          data-testid="decrement-btn"
          className="btn btn-danger"
        >
          -{step}
        </button>
        <button 
          onClick={onIncrement}
          data-testid="increment-btn"
          className="btn btn-success"
        >
          +{step}
        </button>
        <button 
          onClick={onReset}
          data-testid="reset-btn"
          className="btn btn-primary"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default CounterDisplay;