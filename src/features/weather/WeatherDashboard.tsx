// src/features/weather/WeatherDashboard.tsx
import React, { useState } from 'react';
import MultiCityWeather from './MultiCityWeather';
import WeatherChart from './WeatherChart';
import WeatherGlobe from '@/components/WeatherGlobe';

const WeatherDashboard: React.FC = () => {
  const [searchCity, setSearchCity] = useState<string>('Hyderabad');
  const [inputCity, setInputCity] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSearch = () => {
    const trimmedCity = inputCity.trim();
    if (!trimmedCity) {
      setError('City name cannot be empty.');
      return;
    }
    if (trimmedCity.length < 3) {
      setError('Please enter at least 3 characters.');
      return;
    }
    setSearchCity(trimmedCity);
    setInputCity('');
    setError('');
  };

  const dismissError = () => setError('');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center relative">
      <WeatherGlobe city={searchCity} />
      <header className="w-full max-w-7xl px-6 py-8 z-10">
        <h1 className="text-4xl font-bold text-blue-300 text-center">
          Weather Dashboard
        </h1>
        <p className="text-gray-400 text-center mt-2">
          Check the weather for your favorite cities
        </p>
      </header>
      <main className="w-full max-w-7xl px-6 flex flex-col gap-10 z-10">
        <section className="w-full flex flex-col items-center">
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
            <input
              type="text"
              value={inputCity}
              onChange={(e) => setInputCity(e.target.value)}
              className="p-3 border border-gray-600 rounded-lg w-full bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
              placeholder="Search for a city"
            />
            <button
              onClick={handleSearch}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              Search
            </button>
          </div>
          {error && (
            <div className="mt-3 p-2 bg-red-600 text-white rounded-lg flex justify-between items-center w-full max-w-md">
              <p>{error}</p>
              <button
                onClick={dismissError}
                className="text-white hover:text-gray-300 transition-colors"
              >
                ✕
              </button>
            </div>
          )}
        </section>
        <section className="w-full">
          <WeatherChart city={searchCity} />
        </section>
        <section className="w-full">
          <MultiCityWeather />
        </section>
      </main>
      <footer className="w-full max-w-7xl px-6 py-8 mt-10 z-10">
        <p className="text-gray-400 text-center">
          © 2025 Weather Dashboard. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default WeatherDashboard;