import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import WeatherCard from '@/features/weather/WeatherCard';
import MultiCityWeather from '@/features/weather/MultiCityWeather';
import NewsCard from '@/features/news/NewsCard';

export default function Home() {
  const [city, setCity] = useState('Hyderabad');

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-4">Weather Dashboard</h1>

        <div className="mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full sm:w-1/2"
            placeholder="Search weather for a city"
          />
          <WeatherCard city={city} />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Major Cities Weather Overview</h2>
          <MultiCityWeather />
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-2">Top News</h2>
          <NewsCard />
        </div>
      </div>
    </DashboardLayout>
  );
}