import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CounterDisplay from './CounterDisplay';

describe('CounterDisplay Component', () => {
  const mockProps = {
    count: 5,
    step: 2,
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
    onReset: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays current count correctly', () => {
    render(<CounterDisplay {...mockProps} />);
    
    const countValue = screen.getByTestId('counter-value');
    expect(countValue).toHaveTextContent('5');
  });

  test('calls onIncrement when increment button is clicked', async () => {
    render(<CounterDisplay {...mockProps} />);
    const user = userEvent.setup();
    
    const incrementButton = screen.getByTestId('increment-btn');
    await user.click(incrementButton);
    
    expect(mockProps.onIncrement).toHaveBeenCalledTimes(1);
  });

  test('calls onDecrement when decrement button is clicked', async () => {
    render(<CounterDisplay {...mockProps} />);
    const user = userEvent.setup();
    
    const decrementButton = screen.getByTestId('decrement-btn');
    await user.click(decrementButton);
    
    expect(mockProps.onDecrement).toHaveBeenCalledTimes(1);
  });

  test('calls onReset when reset button is clicked', async () => {
    render(<CounterDisplay {...mockProps} />);
    const user = userEvent.setup();
    
    const resetButton = screen.getByTestId('reset-btn');
    await user.click(resetButton);
    
    expect(mockProps.onReset).toHaveBeenCalledTimes(1);
  });

  test('buttons display correct step values', () => {
    render(<CounterDisplay {...mockProps} />);
    
    const incrementButton = screen.getByTestId('increment-btn');
    const decrementButton = screen.getByTestId('decrement-btn');
    
    expect(incrementButton).toHaveTextContent('+2');
    expect(decrementButton).toHaveTextContent('-2');
  });
});