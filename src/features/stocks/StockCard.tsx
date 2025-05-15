// src/features/stocks/StockCard.tsx
import React, { useState, useEffect } from 'react';
import { useGetStockPriceQuery } from '@/services/stockApi';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import styles from './StockCard.module.css';
import { motion } from 'framer-motion';

interface StockCardProps {
  symbol: string;
}

const StockCard: React.FC<StockCardProps> = ({ symbol }) => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('5min');
  const [chartData, setChartData] = useState<any[]>([]);
  const { data, error, isLoading } = useGetStockPriceQuery(
    { symbol, interval: timeRange },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    // Initial chart data from API
    if (data?.values) {
      const initialData = data.values
        .slice(0, 10)
        .map((entry: any) => ({
          time: new Date(entry.datetime).toLocaleTimeString(),
          price: parseFloat(entry.open),
        }))
        .reverse();
      setChartData(initialData);
    }

    // WebSocket for real-time updates
    const ws = new WebSocket(`wss://ws.twelvedata.com/v1/quotes/price?apikey=${process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY}`);

    ws.onopen = () => {
      ws.send(JSON.stringify({ action: 'subscribe', params: { symbols: symbol } }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.event === 'price' && message.symbol === symbol) {
        const newPrice = message.price;
        setChartData((prev) => {
          const newData = [...prev.slice(-9)]; // Keep last 9 entries
          newData.push({
            time: new Date().toLocaleTimeString(),
            price: parseFloat(newPrice),
          });
          return newData;
        });
      }
    };

    ws.onerror = (error) => console.error('WebSocket error:', error);
    ws.onclose = () => console.log('WebSocket closed');

    return () => ws.close();
  }, [data, symbol]);

  if (isLoading) return <div className={styles.card}>Loading {symbol}...</div>;

  if (error || !data || data.status !== 'ok' || !data.values) {
    return (
      <div className={styles.card}>
        <h2 className={styles.title}>{symbol}</h2>
        <p className="text-red-500">
          {error ? 'Failed to load stock data.' : 'No stock data available.'}
        </p>
      </div>
    );
  }

  const latestData = data.values[0];
  const companyDomains: { [key: string]: string } = {
    AAPL: 'apple',
    GOOGL: 'google',
    MSFT: 'microsoft',
    TSLA: 'tesla',
  };
  const domain = companyDomains[symbol] || symbol.toLowerCase();
  const logoUrl = `https://logo.clearbit.com/${domain}.com`;

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <Image
          src={logoUrl}
          alt={`${symbol} logo`}
          width={40}
          height={40}
          className="rounded-full"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/40?text=Logo';
          }}
        />
        <h2 className={styles.title}>{symbol}</h2>
      </div>
      <p className={styles.text}><strong>{t('price')}:</strong> ${chartData[chartData.length - 1]?.price || latestData.open}</p>
      <p className={styles.text}><strong>{t('high')}:</strong> ${latestData.high}</p>
      <p className={styles.text}><strong>{t('low')}:</strong> ${latestData.low}</p>
      <p className={styles.text}><strong>{t('volume')}:</strong> ${latestData.volume}</p>

      <select
        value={timeRange}
        onChange={(e) => setTimeRange(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4 bg-white text-gray-800"
      >
        <option value="1min">{t('1minute')}</option>
        <option value="5min">{t('5minutes')}</option>
        <option value="15min">{t('15minutes')}</option>
        <option value="30min">{t('30minutes')}</option>
      </select>

      <LineChart width={300} height={200} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#10b981" animationDuration={1000} />
      </LineChart>
    </motion.div>
  );
};

export default StockCard;