import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StepControl from './StepControl';

describe('StepControl Component', () => {
  const mockSetStep = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders step control with current step value', () => {
    render(<StepControl step={3} setStep={mockSetStep} />);
    
    expect(screen.getByText('Step: 3')).toBeInTheDocument();
    expect(screen.getByTestId('step-slider')).toHaveValue('3');
  });

  test('slider updates step value', async () => {
    render(<StepControl step={1} setStep={mockSetStep} />);
    const user = userEvent.setup();
    
    const slider = screen.getByTestId('step-slider');
    await user.click(slider);
    
    // Simulate changing slider value
    fireEvent.change(slider, { target: { value: '5' } });
    
    expect(mockSetStep).toHaveBeenCalledWith(5);
  });

  test('quick step buttons work correctly', async () => {
    render(<StepControl step={1} setStep={mockSetStep} />);
    const user = userEvent.setup();
    
    const step5Button = screen.getByText('5');
    await user.click(step5Button);
    
    expect(mockSetStep).toHaveBeenCalledWith(5);
  });

  test('active quick step button has correct styling', () => {
    render(<StepControl step={2} setStep={mockSetStep} />);
    
    const activeButton = screen.getByText('2');
    expect(activeButton).toHaveClass('active');
  });
});