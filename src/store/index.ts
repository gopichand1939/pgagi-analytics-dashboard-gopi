import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from '@/services/weatherApi';
import { newsApi } from '@/services/newsApi';
import { stockApi } from '@/services/stockApi';
import { movieApi } from '@/services/movieApi';
import { geoDbApi } from '@/services/geoDbApi';

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [stockApi.reducerPath]: stockApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
    [geoDbApi.reducerPath]: geoDbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      weatherApi.middleware,
      newsApi.middleware,
      stockApi.middleware,
      movieApi.middleware,
      geoDbApi.middleware
    ),
});