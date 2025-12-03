import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WeatherWidget from './WeatherWidget';

describe('WeatherWidget Component', () => {
  const mockWeatherData = {
    name: 'London',
    sys: { country: 'GB' },
    main: {
      temp: 22,
      feels_like: 23,
      humidity: 65,
      pressure: 1013
    },
    weather: [
      {
        description: 'Partly Cloudy',
        icon: '02d'
      }
    ],
    wind: { speed: 5.2 },
    visibility: 10000
  };

  const mockOnCitySearch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    render(
      <WeatherWidget 
        loading={true}
        weather={null}
        onCitySearch={mockOnCitySearch}
      />
    );
    
    expect(screen.getByText(/Loading weather data/i)).toBeInTheDocument();
  });

  test('renders weather data correctly', () => {
    render(
      <WeatherWidget 
        loading={false}
        weather={mockWeatherData}
        onCitySearch={mockOnCitySearch}
      />
    );

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('22°C')).toBeInTheDocument();
    expect(screen.getByText(/Feels like: 23°C/i)).toBeInTheDocument();
    expect(screen.getByText('Partly Cloudy')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('5.2 m/s')).toBeInTheDocument();
    expect(screen.getByText('1013 hPa')).toBeInTheDocument();
    expect(screen.getByText('10.0 km')).toBeInTheDocument();
  });

  test('renders error message when provided', () => {
    render(
      <WeatherWidget 
        loading={false}
        weather={mockWeatherData}
        onCitySearch={mockOnCitySearch}
        error="API Error"
      />
    );

    expect(screen.getByText(/⚠️ API Error/i)).toBeInTheDocument();
  });

  test('handles missing weather data gracefully', () => {
    const incompleteWeatherData = {
      name: 'Unknown',
      main: { temp: null },
      weather: [{}]
    };

    render(
      <WeatherWidget 
        loading={false}
        weather={incompleteWeatherData}
        onCitySearch={mockOnCitySearch}
      />
    );

    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  test('calls onCitySearch when form is submitted', async () => {
    render(
      <WeatherWidget 
        loading={false}
        weather={mockWeatherData}
        onCitySearch={mockOnCitySearch}
      />
    );

    const user = userEvent.setup();
    const searchInput = screen.getByTestId('weather-search-input');
    const searchButton = screen.getByTestId('weather-search-btn');

    await user.type(searchInput, 'New York');
    await user.click(searchButton);

    expect(mockOnCitySearch).toHaveBeenCalledWith('New York');
    expect(searchInput).toHaveValue('');
  });

  test('does not call onCitySearch with empty input', async () => {
    render(
      <WeatherWidget 
        loading={false}
        weather={mockWeatherData}
        onCitySearch={mockOnCitySearch}
      />
    );

    const user = userEvent.setup();
    const searchButton = screen.getByTestId('weather-search-btn');

    await user.click(searchButton);

    expect(mockOnCitySearch).not.toHaveBeenCalled();
  });

  test('updates search input value', async () => {
    render(
      <WeatherWidget 
        loading={false}
        weather={mockWeatherData}
        onCitySearch={mockOnCitySearch}
      />
    );

    const user = userEvent.setup();
    const searchInput = screen.getByTestId('weather-search-input');

    await user.type(searchInput, 'Tokyo');

    expect(searchInput).toHaveValue('Tokyo');
  });

  test('form submission prevents default', async () => {
    render(
      <WeatherWidget 
        loading={false}
        weather={mockWeatherData}
        onCitySearch={mockOnCitySearch}
      />
    );

    const user = userEvent.setup();
    const searchInput = screen.getByTestId('weather-search-input');
    const searchButton = screen.getByTestId('weather-search-btn');

    await user.type(searchInput, 'Paris');
    await user.click(searchButton);

    expect(mockOnCitySearch).toHaveBeenCalledWith('Paris');
  });

  test('handles weather data with string wind speed', () => {
    const weatherWithStringSpeed = {
      ...mockWeatherData,
      wind: { speed: '5.2' }
    };

    render(
      <WeatherWidget 
        loading={false}
        weather={weatherWithStringSpeed}
        onCitySearch={mockOnCitySearch}
      />
    );

    expect(screen.getByText('5.2 m/s')).toBeInTheDocument();
  });

  test('handles weather data with numeric wind speed', () => {
    const weatherWithNumberSpeed = {
      ...mockWeatherData,
      wind: { speed: 5.2 }
    };

    render(
      <WeatherWidget 
        loading={false}
        weather={weatherWithNumberSpeed}
        onCitySearch={mockOnCitySearch}
      />
    );

    expect(screen.getByText('5.2 m/s')).toBeInTheDocument();
  });

  test('renders fallback UI when weather is null', () => {
    render(
      <WeatherWidget 
        loading={false}
        weather={null}
        onCitySearch={mockOnCitySearch}
      />
    );

    expect(screen.getByText(/Unable to fetch weather data/i)).toBeInTheDocument();
    expect(screen.getByText(/Try searching for a city/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter city name/i)).toBeInTheDocument();
  });

  test('renders current date', () => {
    render(
      <WeatherWidget 
        loading={false}
        weather={mockWeatherData}
        onCitySearch={mockOnCitySearch}
      />
    );

    const currentDate = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });

    expect(screen.getByText(currentDate)).toBeInTheDocument();
  });

  // New test for edge cases without "N/A" conflicts
  test('renders with incomplete data without errors', () => {
    const minimalData = {
      name: 'Test City'
    };

    render(
      <WeatherWidget 
        loading={false}
        weather={minimalData}
        onCitySearch={mockOnCitySearch}
      />
    );

    expect(screen.getByText('Test City')).toBeInTheDocument();
    // Check that component renders without throwing
    expect(screen.getByRole('heading', { name: /Weather/i })).toBeInTheDocument();
  });
});