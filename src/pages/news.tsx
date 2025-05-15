import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import NewsCard from '@/features/news/NewsCard';

const NewsPage = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">📰 News Headlines</h1>
      <NewsCard />
    </DashboardLayout>
  );
};

export default NewsPage;