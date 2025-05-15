import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useGetWeatherByCityQuery } from '@/services/weatherApi';
import sunnyAnimation from './sunny.json';
import rainyAnimation from './rainy.json';
import cloudyAnimation from './cloudy.json';
import styles from './WeatherCard.module.css';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const LottieClient = dynamic(() => import('@/components/LottieClient'), { ssr: false });

const WeatherCard: React.FC<{ city: string }> = ({ city }) => {
  const [userCity, setUserCity] = useState<string | null>(null);
  const { data, error, isLoading } = useGetWeatherByCityQuery(city || userCity || 'Hyderabad');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
            );
            const geoData = await response.json();
            setUserCity(geoData.name);
          } catch (err) {
            console.error('Geolocation fetch error:', err);
            toast.error('Failed to fetch location-based weather');
          }
        },
        (err) => {
          console.error('Geolocation error:', err);
          toast.warn('Geolocation access denied. Using default city.');
        }
      );
    }
  }, []);

  const getWeatherAnimation = (weather: string) => {
    // Log the weather condition for debugging
    console.log(`Weather condition for ${city || userCity || 'Hyderabad'}: ${weather}`);

    // Map weather conditions to animations based on OpenWeatherMap API values
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
        // Default to cloudy for unknown conditions
        console.warn(`Unknown weather condition: ${weather}, defaulting to cloudy`);
        return cloudyAnimation;
    }
  };

  if (isLoading) return (
    <motion.div
      className={styles.card}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      <div className={styles.animationWrapper}>
        <LottieClient animationData={cloudyAnimation} className={styles.animation} />
      </div>
      <p className={styles.text}>Loading weather...</p>
    </motion.div>
  );

  if (error || !data) {
    toast.error(`Failed to load weather for ${city || userCity || 'Hyderabad'}`);
    return (
      <motion.div
        className={styles.card}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      >
        <p className={styles.text}>Failed to load weather for {city || userCity || 'Hyderabad'}</p>
      </motion.div>
    );
  }

  // Ensure the weather condition is correctly accessed from the API response
  const weatherCondition = data.weather[0]?.main;
  const animationData = getWeatherAnimation(weatherCondition);

  return (
    <motion.div
      className={styles.card}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, type: 'spring', stiffness: 120, damping: 10 }}
    >
      <div className={styles.animationWrapper}>
        <LottieClient animationData={animationData} className={styles.animation} />
      </div>
      <h2 className={styles.title}>{data.name}</h2>
      <p className={styles.text}>
        <strong>Temp:</strong> {data.main.temp}°C
      </p>
      <p className={styles.text}>
        <strong>Weather:</strong> {data.weather[0]?.main}, {data.weather[0]?.description}
      </p>
      <p className={styles.text}>
        <strong>Humidity:</strong> {data.main.humidity}%
      </p>
    </motion.div>
  );
};

export default WeatherCard;