import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryPanel from './HistoryPanel';

describe('HistoryPanel Component', () => {
  const mockHistory = [
    { action: 'Incremented by 2', value: 2, timestamp: '12:00:00 PM' },
    { action: 'Decremented by 1', value: 1, timestamp: '12:01:00 PM' }
  ];

  const mockOnResetAll = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders history items', () => {
    render(<HistoryPanel history={mockHistory} onResetAll={mockOnResetAll} />);
    
    expect(screen.getByText('Incremented by 2')).toBeInTheDocument();
    expect(screen.getByText('Decremented by 1')).toBeInTheDocument();
    expect(screen.getByText('→ 2')).toBeInTheDocument();
    expect(screen.getByText('12:00:00 PM')).toBeInTheDocument();
  });

  test('shows empty state when no history', () => {
    render(<HistoryPanel history={[]} onResetAll={mockOnResetAll} />);
    
    expect(screen.getByText('No operations yet')).toBeInTheDocument();
  });

  test('calls onResetAll when reset everything button is clicked', async () => {
    render(<HistoryPanel history={mockHistory} onResetAll={mockOnResetAll} />);
    const user = userEvent.setup();
    
    const resetButton = screen.getByTestId('reset-all-btn');
    await user.click(resetButton);
    
    expect(mockOnResetAll).toHaveBeenCalledTimes(1);
  });
});