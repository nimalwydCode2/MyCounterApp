import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Integration Tests', () => {
  test('complete counter workflow', async () => {
    render(<App />);
    const user = userEvent.setup();
    
    // Check initial state
    expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
    
    // Change step to 3
    const slider = screen.getByTestId('step-slider');
    fireEvent.change(slider, { target: { value: '3' } });
    
    // Increment counter
    const incrementButton = screen.getByTestId('increment-btn');
    await user.click(incrementButton);
    
    // Check counter updated
    expect(screen.getByTestId('counter-value')).toHaveTextContent('3');
    
    // Check history was recorded
    expect(screen.getByText('Incremented by 3')).toBeInTheDocument();
    
    // Save as favorite
    const favoriteInput = screen.getByTestId('favorite-input');
    const saveButton = screen.getByTestId('save-favorite-btn');
    
    await user.type(favoriteInput, 'Three');
    await user.click(saveButton);
    
    // Check favorite was saved
    expect(screen.getByText('Three: 3')).toBeInTheDocument();
    
    // Reset everything
    const resetAllButton = screen.getByTestId('reset-all-btn');
    await user.click(resetAllButton);
    
    // Check everything was reset
    expect(screen.getByTestId('counter-value')).toHaveTextContent('0');
    expect(screen.getByText('Reset all')).toBeInTheDocument();
  });
});