import { ReactNode } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import Header from '@/components/Header';
import { AnimatePresence, motion } from 'framer-motion';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 text-gray-800">
      {/* Header */}
      <Header />

      {/* Sidebar */}
      <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white shadow-lg p-4 overflow-y-auto z-10">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">📊 {t('dashboard')}</h2>
        <nav className="space-y-2">
          <Link href="/" className="block px-2 py-1 rounded hover:bg-blue-100 text-blue-600 hover:text-blue-800 transition-colors">
            {t('overview')}
          </Link>
          <Link href="/weather" className="block px-2 py-1 rounded hover:bg-blue-100 text-blue-600 hover:text-blue-800 transition-colors">
            {t('weather')}
          </Link>
          <Link href="/stocks" className="block px-2 py-1 rounded hover:bg-blue-100 text-blue-600 hover:text-blue-800 transition-colors">
            {t('stocks')}
          </Link>
          <Link href="/news" className="block px-2 py-1 rounded hover:bg-blue-100 text-blue-600 hover:text-blue-800 transition-colors">
            {t('news')}
          </Link>
          <Link href="/movies" className="block px-2 py-1 rounded hover:bg-blue-100 text-blue-600 hover:text-blue-800 transition-colors">
            {t('movies')}
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-64 mt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={children?.toString()}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}