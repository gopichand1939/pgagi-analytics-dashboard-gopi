import React, { useState } from 'react';
import WeatherCard from './WeatherCard';
import { Reorder } from 'framer-motion';

const MultiCityWeather: React.FC = () => {
  const [cities, setCities] = useState<string[]>(['Hyderabad', 'Delhi', 'Mumbai']);
  const [inputCity, setInputCity] = useState<string>('');
  const [error, setError] = useState<string>('');

  const addCity = () => {
    const trimmedCity = inputCity.trim();

    if (!trimmedCity) {
      setError('City name cannot be empty.');
      return;
    }

    if (trimmedCity.length < 3) {
      setError('Please enter at least 3 characters.');
      return;
    }

    if (cities.includes(trimmedCity)) {
      setError('City already added.');
      return;
    }

    setCities([...cities, trimmedCity]);
    setInputCity('');
    setError('');
  };

  const removeCity = (cityToRemove: string) => {
    setCities(cities.filter((city) => city !== cityToRemove));
  };

  const dismissError = () => {
    setError('');
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4 text-blue-300">Multi-City Weather Dashboard</h1>

      <div className="my-4 flex items-center space-x-3">
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          className="p-2 border border-gray-600 rounded w-64 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter city name"
        />
        <button
          onClick={addCity}
          className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Add City
        </button>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-600 text-white rounded flex justify-between items-center">
          <p>{error}</p>
          <button
            onClick={dismissError}
            className="text-white hover:text-gray-300 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      <Reorder.Group
        as="ul"
        axis="y"
        values={cities}
        onReorder={setCities}
        className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {cities.map((city) => (
          <Reorder.Item
            as="li"
            key={city}
            value={city}
            whileDrag={{ scale: 1.05 }}
            className="cursor-move relative"
          >
            <div className="relative">
              <WeatherCard city={city} />
              <button
                onClick={() => removeCity(city)}
                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                title={`Remove ${city}`}
              >
                ✕
              </button>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export default MultiCityWeather;