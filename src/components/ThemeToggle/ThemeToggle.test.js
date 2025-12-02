import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle Component', () => {
  const mockSetDarkMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders in light mode by default', () => {
    render(<ThemeToggle darkMode={false} setDarkMode={mockSetDarkMode} />);
    
    expect(screen.getByText('Light Mode')).toBeInTheDocument();
  });

  test('renders in dark mode when prop is true', () => {
    render(<ThemeToggle darkMode={true} setDarkMode={mockSetDarkMode} />);
    
    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  test('calls setDarkMode when toggle is clicked', async () => {
    render(<ThemeToggle darkMode={false} setDarkMode={mockSetDarkMode} />);
    const user = userEvent.setup();
    
    const toggle = screen.getByTestId('theme-toggle');
    await user.click(toggle);
    
    expect(mockSetDarkMode).toHaveBeenCalledWith(true);
  });
});