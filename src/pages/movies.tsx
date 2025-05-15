import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MovieCard from '@/features/movies/MovieCard';

const MoviesPage = () => {
  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-4">🎬 Movies Dashboard</h1>
      <p className="text-gray-700">Movie information will appear here soon.</p>
         <MovieCard />

    </DashboardLayout>
  );
};

export default MoviesPage;
