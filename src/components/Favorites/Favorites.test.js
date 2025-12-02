import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Favorites from './Favorites';

describe('Favorites Component', () => {
  const mockProps = {
    count: 10,
    favorites: [
      { name: 'High Score', value: 50 },
      { name: 'Low Score', value: -5 }
    ],
    setFavorites: jest.fn(),
    onLoadFavorite: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders favorites list', () => {
    render(<Favorites {...mockProps} />);
    
    expect(screen.getByText('High Score: 50')).toBeInTheDocument();
    expect(screen.getByText('Low Score: -5')).toBeInTheDocument();
  });

  test('saves favorite when save button is clicked', async () => {
    render(<Favorites {...mockProps} />);
    const user = userEvent.setup();
    
    const input = screen.getByTestId('favorite-input');
    const saveButton = screen.getByTestId('save-favorite-btn');
    
    await user.type(input, 'My Favorite');
    await user.click(saveButton);
    
    expect(mockProps.setFavorites).toHaveBeenCalled();
  });

  test('does not save favorite with empty name', async () => {
    render(<Favorites {...mockProps} />);
    const user = userEvent.setup();
    
    const saveButton = screen.getByTestId('save-favorite-btn');
    await user.click(saveButton);
    
    expect(mockProps.setFavorites).not.toHaveBeenCalled();
  });

  test('loads favorite when load button is clicked', async () => {
    render(<Favorites {...mockProps} />);
    const user = userEvent.setup();
    
    const loadButtons = screen.getAllByText('Load');
    await user.click(loadButtons[0]);
    
    expect(mockProps.onLoadFavorite).toHaveBeenCalledWith(50);
  });
});