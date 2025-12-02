import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  test('renders counter dashboard header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Enhanced Counter Dashboard/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('renders all main sections', () => {
    render(<App />);
    
    expect(screen.getByText(/Step Control/i)).toBeInTheDocument();
    expect(screen.getByText(/Save Favorites/i)).toBeInTheDocument();
    expect(screen.getByText(/Operation History/i)).toBeInTheDocument();
    expect(screen.getByText(/Current Value/i)).toBeInTheDocument();
  });

  test('theme toggle switches between light and dark mode', async () => {
    render(<App />);
    const user = userEvent.setup();
    
    const themeToggle = screen.getByTestId('theme-toggle');
    const modeText = screen.getByText(/Light Mode/i);
    
    expect(modeText).toHaveTextContent('Light Mode');
    
    await user.click(themeToggle);
    
    expect(screen.getByText(/Dark Mode/i)).toBeInTheDocument();
  });
});