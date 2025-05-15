// src/components/Header.tsx
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { data: session, status } = useSession();
  const [theme, setTheme] = useState('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileButtonRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fallbackImage = 'https://avatars.githubusercontent.com/u/583231?v=4';
  const imageSrc = status === 'authenticated' && session?.user?.image ? session.user.image : fallbackImage;

  return (
    <header
      className="fixed top-0 left-0 right-0 shadow p-4 flex justify-between items-center z-20"
      role="banner"
      aria-label="Main header"
    >
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">{t('dashboard')}</h1>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('search')}
          className="p-2 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Search sections"
        />
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded hover:bg-opacity-80 transition-colors"
          style={{
            background: theme === 'light' ? '#ffffff' : '#4b5563',
            color: theme === 'light' ? '#2563eb' : '#ffffff',
          }}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        {status === 'authenticated' ? (
          <div className="relative">
            <div ref={profileButtonRef}>
              <Image
                src={imageSrc}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full cursor-pointer"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setIsProfileOpen(!isProfileOpen)}
                aria-label="User profile menu"
                role="button"
                aria-expanded={isProfileOpen}
                onError={() => console.error('Failed to load user avatar:', imageSrc)}
              />
            </div>
            {isProfileOpen && (
              <div
                ref={menuRef}
                className="absolute right-0 mt-2 w-48 shadow-lg rounded card bg-white dark:bg-gray-800"
                role="menu"
                aria-label="User menu"
              >
                <Link
                  href="/settings"
                  className="block px-4 py-2 hover:bg-gray-100 hover:bg-opacity-20"
                  role="menuitem"
                  tabIndex={0}
                >
                  Settings
                </Link>
                <Link
                  href="/notifications"
                  className="block px-4 py-2 hover:bg-gray-100 hover:bg-opacity-20"
                  role="menuitem"
                  tabIndex={0}
                >
                  Notifications
                </Link>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 hover:bg-opacity-20"
                  role="menuitem"
                  tabIndex={0}
                  onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                  onKeyDown={(e) => e.key === 'Enter' && signOut({ callbackUrl: '/auth/signin' })}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/auth/signin"
            className="p-2 rounded hover:bg-opacity-80 transition-colors"
            style={{ background: theme === 'light' ? '#ffffff' : '#4b5563', color: theme === 'light' ? '#2563eb' : '#ffffff' }}
            aria-label="Sign in"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
