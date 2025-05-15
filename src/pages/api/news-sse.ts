// src/pages/api/news-sse.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const sendNewsUpdate = () => {
    const news = [
      { id: '1', message: 'Breaking: Tech stocks surge!' },
      { id: '2', message: 'New policy announced in Business sector.' },
    ];
    const randomNews = news[Math.floor(Math.random() * news.length)];
    res.write(`data: ${JSON.stringify(randomNews)}\n\n`);
  };

  const interval = setInterval(sendNewsUpdate, 10000); // Send updates every 10 seconds

  req.on('close', () => {
    clearInterval(interval);
    res.end();
  });
}