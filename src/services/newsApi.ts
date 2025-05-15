import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsArticle } from '@/types/news';
import type { FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react';

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://newsapi.org/v2/',
  }),
  endpoints: (builder) => ({
    getTopHeadlinesByCategory: builder.query<{ articles: NewsArticle[] }, string>({
      query: (category: string) =>
        `top-headlines?country=us&category=${category}&apiKey=${NEWS_API_KEY}`,
      transformResponse: (
        response: { articles: any[] },
        _meta: FetchBaseQueryMeta | undefined,
        _arg: string
      ): { articles: NewsArticle[] } => {
        return {
          articles: response.articles.map((article) => ({
            title: article.title,
            description: article.description ?? null,
            publishedAt: article.publishedAt,
            url: article.url,
            source: article.source.name,
          })),
        };
      },
    }),
  }),
});

export const { useGetTopHeadlinesByCategoryQuery } = newsApi;