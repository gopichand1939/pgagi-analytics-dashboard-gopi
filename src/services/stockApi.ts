// src/services/stockApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TWELVE_API_KEY = process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY;

export const stockApi = createApi({
  reducerPath: 'stockApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.twelvedata.com/',
  }),
  endpoints: (builder) => ({
    getStockPrice: builder.query({
      query: ({ symbol, interval }) =>
        `time_series?symbol=${symbol}&interval=${interval}&apikey=${TWELVE_API_KEY}&outputsize=12`,
      // Cache for 5 minutes
      keepUnusedDataFor: 300,
    }),
  }),
});

export const { useGetStockPriceQuery } = stockApi;