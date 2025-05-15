import React from 'react';
import dynamic from 'next/dynamic';
import { useGetWeatherForecastByCityQuery } from '@/services/weatherApi';
import sunnyAnimation from './sunny.json';
import rainyAnimation from './rainy.json';
import cloudyAnimation from './cloudy.json';
import styles from './WeatherCard.module.css';
import { motion } from 'framer-motion';

const LottieClient = dynamic(() => import('@/components/LottieClient'), { ssr: false });

interface WeatherChartProps {
  city: string;
}

interface ForecastEntry {
  dt: number;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
}

const WeatherChart: React.FC<WeatherChartProps> = ({ city }) => {
  const { data, error, isLoading } = useGetWeatherForecastByCityQuery(city || 'Hyderabad');

  const getWeatherAnimation = (weather: string): any => {
    console.log(`Weather condition for chart in ${city}: ${weather}`);
    switch (weather?.toLowerCase()) {
      case 'clear':
        return sunnyAnimation;
      case 'rain':
      case 'drizzle':
      case 'shower rain':
        return rainyAnimation;
      case 'clouds':
      case 'scattered clouds':
      case 'broken clouds':
      case 'few clouds':
        return cloudyAnimation;
      default:
        console.warn(`Unknown weather condition: ${weather}, defaulting to cloudy`);
        return cloudyAnimation;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg shadow-xl text-white">
        <div className="animate-pulse flex items-center justify-center">
          <div className={styles.animationWrapper}>
            <LottieClient animationData={cloudyAnimation} className={styles.animation} />
          </div>
          <p className="ml-4">Loading chart...</p>
        </div>
      </div>
    );
  }

  if (error || !data || !data.list || data.list.length === 0) {
    return (
      <div className="p-6 bg-gray-800 rounded-lg shadow-xl text-red-500 text-center">
        Failed to load chart data for {city}.
      </div>
    );
  }

  const currentWeather: ForecastEntry = data.list[0];
  const weatherCondition = currentWeather.weather[0]?.main;
  const animationData = getWeatherAnimation(weatherCondition);

  const chartData: Array<{ time: string; temp: number }> = data.list
    .slice(0, 5)
    .map((entry: ForecastEntry) => ({
      time: new Date(entry.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }),
      temp: entry.main.temp,
    }));

  const temperatures = chartData.map((entry) => entry.temp);
  const maxTemp = Math.max(...temperatures);
  const minTemp = Math.min(...temperatures);
  const tempRange = maxTemp - minTemp || 1;

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl text-white">
      <div className="flex items-center justify-center mb-6">
        <div className={styles.animationWrapper}>
          <LottieClient animationData={animationData} className={styles.animation} />
        </div>
        <h2 className="ml-4 text-2xl font-semibold text-blue-300">{city} Temperature Chart</h2>
      </div>
      <div className="relative h-48 flex items-end justify-around bg-gray-700 rounded-lg p-4">
        {chartData.map((entry: { time: string; temp: number }, index: number) => {
          const barHeight = ((entry.temp - minTemp) / tempRange) * 120 + 20;
          return (
            <motion.div
              key={index}
              className="flex flex-col items-center"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: barHeight, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className="bg-blue-500 rounded-t w-10"
                style={{ height: `${barHeight}px` }}
              />
              <p className="mt-2 text-gray-300 text-sm">{entry.temp}°C</p>
              <p className="text-gray-400 text-xs">{entry.time}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherChart;