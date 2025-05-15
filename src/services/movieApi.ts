import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TrendingMoviesResponse } from '@/types/movie'; // Import the new interface

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3/',
  }),
  endpoints: (builder) => ({
    getTrendingMovies: builder.query<TrendingMoviesResponse, void>({ // Use TrendingMoviesResponse instead of any
      query: () => `trending/movie/day?api_key=${TMDB_API_KEY}`,
    }),
  }),
});

export const { useGetTrendingMoviesQuery } = movieApi;