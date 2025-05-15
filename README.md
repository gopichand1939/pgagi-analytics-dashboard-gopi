Absolutely, here’s your complete `README.md` rewritten **from your perspective as the author/developer** of the project, ready to be copy-pasted into your GitHub repository.

---

````markdown
# 📊 Comprehensive Analytics Dashboard

Welcome to the **PGAGI Analytics Dashboard** – a real-time, multi-source analytics platform I built using **Next.js**, **TypeScript**, **Redux Toolkit**, and several third-party APIs like **OpenWeatherMap**, **TMDB**, **Twelve Data**, and more.

This project showcases my full-stack skills across UI/UX, API integration, state management, and deployment using Vercel.

---



🔐 To access authenticated pages like `/settings` and `/notifications`, please sign in with Google OAuth.

---

## 🛠 Tech Stack

- **Frontend**: React, Next.js 15, TypeScript, Tailwind CSS
- **State Management**: Redux Toolkit, RTK Query
- **Animation**: Framer Motion, Lottie
- **3D Graphics**: Three.js (Weather Globe)
- **Auth**: NextAuth.js (Google OAuth)
- **Testing**: Jest, Cypress
- **Deployment**: Vercel

---

## 📦 Features I’ve Implemented

- 🌦️ Weather Forecasts (current + 5-day chart)
- 📰 Live News with SSE streaming and category filters
- 📈 Real-time Stock Market updates via WebSocket
- 🎬 Trending Movie Cards via TMDB API
- 🌍 Interactive 3D Weather Globe (Three.js)
- 🔒 Google Sign-in + protected routes
- 🌓 Dark/Light Theme toggle
- 🌐 i18n (English & Spanish) via react-i18next
- ✅ Jest & Cypress Testing Coverage

---

## 🧰 How to Run Locally

### 1. Clone My Repository

```bash
git clone https://github.com/gopichand1939/pgagi-analytics-dashboard-gopi.git
cd pgagi-analytics-dashboard-gopi
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env.local` File

Here’s the `.env.local` structure I used:

```env
# Public APIs
NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key
NEXT_PUBLIC_TWELVE_DATA_API_KEY=your_twelve_data_api_key
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_GEODB_API_KEY=your_geodb_api_key

# Google Auth (NextAuth)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### How I Got These Keys:

* Weather: [openweathermap.org](https://openweathermap.org/)
* News: [newsapi.org](https://newsapi.org/)
* Stocks: [twelvedata.com](https://twelvedata.com/)
* Movies: [themoviedb.org](https://www.themoviedb.org/)
* City Search: [GeoDB on RapidAPI](https://rapidapi.com/wirefreethought/api/geodb-cities)
* Google OAuth: [Google Cloud Console](https://console.cloud.google.com/)

To generate `NEXTAUTH_SECRET`, I used:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

### 4. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

### 5. Build Production (Optional)

```bash
npm run build
npm start
```

---

## 🧪 Testing

### Unit Tests (Jest)

```bash
npm test
```

### End-to-End Tests (Cypress)

```bash
npm run dev
npx cypress open
```

Choose `weather.cy.js` to test drag-and-drop, etc.

---

## 🖼️ Assets I Used

* Lottie files: `sunny.json`, `rainy.json`, `cloudy.json` in `src/features/weather/`
* 3D Texture: `public/earth-texture.jpg` (downloaded from NASA’s blue marble dataset)
* Company Logos: Clearbit (via `logo.clearbit.com`)

---

## 🌐 Deployment

I deployed the app on **Vercel**.

**Steps I followed**:

1. Pushed code to GitHub.
2. Connected repo to Vercel.
3. Added `.env` variables via Vercel dashboard.
4. Final domain:
   👉 `https://pgagi-analytics-dashboard-gopi.vercel.app`

> After deployment, I updated this in `.env.local`:

```env
NEXTAUTH_URL=https://pgagi-analytics-dashboard-gopi.vercel.app
```

Also, I set the Google OAuth **Redirect URI** to:

```
https://pgagi-analytics-dashboard-gopi.vercel.app/api/auth/callback/google
```

---

## 🧩 Troubleshooting Notes

| Issue                           | Fix                                            |
| ------------------------------- | ---------------------------------------------- |
| Auth not redirecting properly   | Ensure `NEXTAUTH_URL` matches deployed URL     |
| Weather/News/Stocks not loading | Double-check your API keys and network status  |
| Cypress not running             | Ensure `npm run dev` is active                 |
| Images blocked in Next.js       | Check `next.config.js > images.remotePatterns` |

---

## 🤝 Feedback or Contributions

Feel free to fork, star, or suggest improvements via [issues](https://github.com/gopichand1939/pgagi-analytics-dashboard-gopi/issues).
I’m happy to collaborate or guide you through the setup if needed.

---



```

---

Let me know if you'd like me to:

- Push this directly to your GitHub `README.md`
- Generate a downloadable version (`README.md` file)
- Add badge icons (e.g., Vercel, License, GitHub Stars)
- Customize it for a job submission or internship use

Ready to proceed with any of the above.
```
