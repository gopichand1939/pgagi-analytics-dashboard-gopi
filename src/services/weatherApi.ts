import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org/data/2.5/',
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city) => `weather?q=${city}&units=metric&appid=${API_KEY}`,
      transformResponse: (response: any) => ({
        name: response.name,
        main: {
          temp: Math.round(response.main.temp),
          humidity: response.main.humidity,
        },
        weather: [{ main: response.weather[0].main, description: response.weather[0].description }],
      }),
    }),
    getWeatherByCityGroup: builder.query({
      query: (ids) => `group?id=${ids}&units=metric&appid=${API_KEY}`,
      transformResponse: (response: any) => ({
        list: response.list.map((city: any) => ({
          name: city.name,
          main: {
            temp: Math.round(city.main.temp),
            humidity: city.main.humidity,
          },
          weather: [{ main: city.weather[0].main, description: city.weather[0].description }],
        })),
      }),
    }),
    getWeatherForecastByCity: builder.query({
      query: (city) => `forecast?q=${city}&units=metric&appid=${API_KEY}`,
      transformResponse: (response: any) => ({
        list: response.list.map((forecast: any) => ({
          dt: forecast.dt,
          main: {
            temp: Math.round(forecast.main.temp),
            humidity: forecast.main.humidity,
          },
          weather: [{ main: forecast.weather[0].main, description: forecast.weather[0].description }],
        })),
      }),
    }),
  }),
});

export const {
  useGetWeatherByCityQuery,
  useGetWeatherByCityGroupQuery,
  useGetWeatherForecastByCityQuery,
} = weatherApi;