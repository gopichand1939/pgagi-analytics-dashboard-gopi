import React from 'react';
import Image from 'next/image';
import { useGetTrendingMoviesQuery } from '@/services/movieApi';
import { Movie } from '@/types/movie';
import styles from './MovieCard.module.css';
import { motion } from 'framer-motion';

const MovieCard: React.FC = () => {
  const { data, error, isLoading } = useGetTrendingMoviesQuery();

  if (isLoading) return <div className="p-4 animate-pulse">Loading movies...</div>;
  if (error || !data?.results) return <div className="p-4 text-red-500">Failed to load movies</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {data.results.map((movie: Movie, index: number) => (
        <motion.div
          key={movie.id}
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
        >
          {movie.poster_path && (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={300}
              className="rounded-lg mb-2"
            />
          )}
          <h3 className={styles.title}>{movie.title}</h3>
          <p className={styles.text}>
            {movie.overview?.substring(0, 100) || 'No description available'}...
          </p>
          <p className={styles.text}>⭐ {movie.vote_average}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default MovieCard;