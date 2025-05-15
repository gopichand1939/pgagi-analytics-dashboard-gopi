// src/features/weather/WeatherPrediction.tsx
import React from 'react';
import { motion } from 'framer-motion';

const WeatherPrediction: React.FC<{ city: string }> = ({ city }) => {
  // Mocked AI prediction
  const prediction = {
    tomorrowTemp: 27,
    chanceOfRain: 30,
  };

  return (
    <motion.div
      className="p-4 bg-gray-800 rounded-lg shadow-xl text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold text-blue-300 mb-2">AI Weather Prediction for {city}</h3>
      <p>Tomorrow's Temperature: {prediction.tomorrowTemp}°C</p>
      <p>Chance of Rain: {prediction.chanceOfRain}%</p>
    </motion.div>
  );
};

export default WeatherPrediction;