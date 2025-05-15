// src/features/news/NewsCard.tsx
import React, { useState, useEffect } from 'react';
import { useGetTopHeadlinesByCategoryQuery } from '@/services/newsApi';
import { NewsArticle } from '@/types/news';
import { useTranslation } from 'react-i18next';
import { formatRelativeDate } from '@/utils/dateUtils';
import styles from './NewsCard.module.css';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const NewsCard: React.FC = () => {
  const { t } = useTranslation();
  const [category, setCategory] = useState<string>('general');
  const [page, setPage] = useState(1);
  const [breakingNews, setBreakingNews] = useState<string[]>([]);
  const categories = ['general', 'technology', 'sports', 'business', 'health', 'entertainment'];
  const articlesPerPage = 9;

  const currentDate = new Date('2025-05-14T21:43:00+05:30');
  const { data, error, isLoading } = useGetTopHeadlinesByCategoryQuery(category);

  useEffect(() => {
    const eventSource = new EventSource('/api/news-sse');

    eventSource.onmessage = (event) => {
      const news = JSON.parse(event.data);
      setBreakingNews((prev) => [...prev, news.message]);
      toast.info(`Breaking News: ${news.message}`);
    };

    eventSource.onerror = () => {
      console.error('SSE error');
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  if (isLoading) return <div className="animate-pulse p-4 text-white">{t('loadingNews')}</div>;
  if (error || !data) return <div className="p-4 text-red-500">{t('failedToLoadNews')}</div>;

  const paginatedArticles = data.articles.slice((page - 1) * articlesPerPage, page * articlesPerPage);
  const totalPages = Math.ceil(data.articles.length / articlesPerPage);

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white">
      {breakingNews.length > 0 && (
        <div className="mb-4 p-2 bg-red-600 text-white rounded">
          <h3 className="font-bold">Breaking News:</h3>
          {breakingNews.map((news, index) => (
            <p key={index}>{news}</p>
          ))}
        </div>
      )}
      <div className="mb-4">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          className="p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedArticles.map((article: NewsArticle, index: number) => (
          <motion.div
            key={article.url}
            className={styles.card}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2, type: 'spring', stiffness: 100 }}
          >
            <h3 className={styles.title}>{article.title}</h3>
            <p className="text-sm text-gray-400 mb-1">
              {formatRelativeDate(article.publishedAt, currentDate)}
            </p>
            <p className={styles.text}>{article.description || t('noDescription')}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {t('readMore')}
            </a>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-center space-x-3">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="p-2 bg-blue-600 text-white rounded disabled:bg-gray-600 hover:bg-blue-700 transition-colors"
        >
          {t('previous')}
        </button>
        <span className="text-gray-300">{t('page')} {page} {t('of')} {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="p-2 bg-blue-600 text-white rounded disabled:bg-gray-600 hover:bg-blue-700 transition-colors"
        >
          {t('next')}
        </button>
      </div>
    </div>
  );
};

export default NewsCard;