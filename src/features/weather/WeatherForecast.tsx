import React from 'react';
import dynamic from 'next/dynamic';
import { useGetWeatherForecastByCityQuery } from '@/services/weatherApi';
import sunnyAnimation from './sunny.json';
import rainyAnimation from './rainy.json';
import cloudyAnimation from './cloudy.json';
import styles from './WeatherCard.module.css';
import { motion } from 'framer-motion';

const LottieClient = dynamic(() => import('@/components/LottieClient'), { ssr: false });

interface WeatherForecastProps {
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

const WeatherForecast: React.FC<WeatherForecastProps> = ({ city }) => {
  const { data, error, isLoading } = useGetWeatherForecastByCityQuery(city || 'Hyderabad');

  const getWeatherAnimation = (weather: string): any => {
    console.log(`Weather condition for forecast in ${city}: ${weather}`);
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

  if (isLoading) return <div className="animate-pulse p-4 text-white">Loading forecast...</div>;
  if (error || !data) return <div className="p-4 text-red-500">Failed to load forecast for {city}</div>;

  // Display forecast for the next 5 days (one entry per day)
  const dailyForecasts: ForecastEntry[] = data.list
    .filter((_: ForecastEntry, index: number) => index % 8 === 0)
    .slice(0, 5); // Roughly every 24 hours (8 intervals of 3 hours)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 bg-gray-900">
      {dailyForecasts.map((forecast: ForecastEntry, index: number) => {
        const weatherCondition = forecast.weather[0]?.main;
        const animationData = getWeatherAnimation(weatherCondition);
        const date = new Date(forecast.dt * 1000);

        return (
          <motion.div
            key={index}
            className={styles.card}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2, type: 'spring', stiffness: 100 }}
          >
            <div className={styles.animationWrapper}>
              <LottieClient animationData={animationData} className={styles.animation} />
            </div>
            <h3 className={styles.title}>
              {date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </h3>
            <p className={styles.text}>
              <strong>Temp:</strong> {forecast.main.temp}°C
            </p>
            <p className={styles.text}>
              <strong>Weather:</strong> {forecast.weather[0]?.main}
            </p>
            <p className={styles.text}>
              <strong>Humidity:</strong> {forecast.main.humidity}%
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default WeatherForecast;