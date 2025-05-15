// src/features/weather/WeatherCard.test.tsx
import React from 'react';
import '@testing-library/jest-dom';


import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import WeatherCard from './WeatherCard';
import { useGetWeatherByCityQuery } from '@/services/weatherApi';

jest.mock('@/services/weatherApi', () => ({
  useGetWeatherByCityQuery: jest.fn(),
}));

describe('WeatherCard', () => {
  beforeEach(() => {
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: {
        name: 'Hyderabad',
        main: { temp: 25, humidity: 60 },
        weather: [{ main: 'Clear', description: 'clear sky' }],
      },
      error: null,
      isLoading: false,
    });
  });

  it('renders weather data correctly', async () => {
    render(
      <Provider store={store}>
        <WeatherCard city="Hyderabad" />
      </Provider>
    );

    expect(screen.getByText('Hyderabad')).toBeInTheDocument();
    expect(screen.getByText(/25°C/)).toBeInTheDocument();
    expect(screen.getByText(/Clear, clear sky/)).toBeInTheDocument();
  });

  it('shows loading state', () => {
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    render(
      <Provider store={store}>
        <WeatherCard city="Hyderabad" />
      </Provider>
    );

    expect(screen.getByText('Loading weather...')).toBeInTheDocument();
  });

  it('shows error state', async () => {
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <WeatherCard city="Hyderabad" />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Failed to load weather for Hyderabad')).toBeInTheDocument();
    });
  });
});


// cypress/e2e/weather.cy.js
describe('Weather Dashboard Drag-and-Drop', () => {
  beforeEach(() => {
    cy.visit('/weather');
  });

  it('should allow reordering cities', () => {
    cy.get('ul').find('li').should('have.length', 3); // Hyderabad, Delhi, Mumbai
    cy.get('ul li').first().contains('Hyderabad');

    // Drag Hyderabad to the second position
    cy.get('ul li').first().trigger('dragstart');
    cy.get('ul li').eq(1).trigger('drop');
    cy.get('ul li').eq(1).contains('Hyderabad');
  });
});