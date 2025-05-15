// src/pages/weather.tsx
import DashboardLayout from '@/components/layout/DashboardLayout';
import WeatherCard from '@/features/weather/WeatherCard';
import MultiCityWeather from '@/features/weather/MultiCityWeather';
import WeatherForecast from '@/features/weather/WeatherForecast';
import WeatherChart from '@/features/weather/WeatherChart';
import WeatherPrediction from '@/features/weather/WeatherPrediction';
import { useState } from 'react';
import DOMPurify from 'dompurify';

export default function WeatherPage() {
  const [city, setCity] = useState('Hyderabad');

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedCity = DOMPurify.sanitize(e.target.value);
    setCity(sanitizedCity);
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-4 text-pink-600 font-comic">🌈 Weather Dashboard</h1>
        <div className="mb-6">
          <input
            type="text"
            value={city}
            onChange={handleCityChange}
            className="p-2 border border-gray-300 rounded w-full sm:w-1/2 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
            placeholder="Search weather for a city"
            aria-label="Search weather for a city"
          />
          <WeatherCard city={city} />
          <WeatherChart city={city} />
          <WeatherForecast city={city} />
          <WeatherPrediction city={city} />
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2 text-pink-600 font-comic">🌟 Multi-City Weather Dashboard</h2>
          <MultiCityWeather />
        </div>
      </div>
    </DashboardLayout>
  );
}