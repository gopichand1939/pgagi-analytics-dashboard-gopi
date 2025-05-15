// src/services/geoDbApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const GEODB_API_KEY = process.env.NEXT_PUBLIC_GEODB_API_KEY;

export const geoDbApi = createApi({
  reducerPath: 'geoDbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://wft-geo-db.p.rapidapi.com/v1/geo/',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', GEODB_API_KEY || '');
      headers.set('X-RapidAPI-Host', 'wft-geo-db.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    searchCities: builder.query({
      query: (namePrefix: string) =>
        `cities?namePrefix=${namePrefix}&limit=100&sort=name`,
    }),
  }),
});

export const { useSearchCitiesQuery } = geoDbApi;
