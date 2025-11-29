import React from 'react';
import './StepControl.css';

function StepControl({ step, setStep }) {
  const quickSteps = [1, 2, 5, 10];
  
  return (
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
          {quickSteps.map(value => (
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
  );
}

export default StepControl;