import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

interface Notification {
  id: string;
  type: 'stock' | 'weather' | 'movie' | 'system';
  message: string;
  timestamp: string;
}

const Notifications: React.FC = () => {
  const { t } = useTranslation();
  const { data: session, status } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'stock',
      message: 'AAPL stock price increased by 5%!',
      timestamp: '2025-05-14T18:00:00',
    },
    {
      id: '2',
      type: 'weather',
      message: 'Severe thunderstorm warning in your area!',
      timestamp: '2025-05-14T17:30:00',
    },
    {
      id: '3',
      type: 'movie',
      message: 'New movie "Dune: Part Two" released!',
      timestamp: '2025-05-14T16:00:00',
    },
    {
      id: '4',
      type: 'system',
      message: 'Your profile was updated successfully.',
      timestamp: '2025-05-14T15:00:00',
    },
  ]);

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in to view notifications.</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4">{t('notifications')}</h1>
      {notifications.length === 0 ? (
        <p className="text-center">{t('noNotifications')}</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notif) => (
            <li key={notif.id} className="card p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {notif.type === 'stock' && '📈 '}
                  {notif.type === 'weather' && '🌧️ '}
                  {notif.type === 'movie' && '🎬 '}
                  {notif.type === 'system' && '⚙️ '}
                  {notif.message}
                </p>
                <p className="text-sm opacity-70">{new Date(notif.timestamp).toLocaleString()}</p>
              </div>
              <button
                onClick={() => dismissNotification(notif.id)}
                className="p-2 rounded hover:bg-opacity-80 transition-colors"
                style={{
                  background: document.documentElement.getAttribute('data-theme') === 'light' ? '#ef4444' : '#f87171',
                  color: '#ffffff',
                }}
                aria-label="Dismiss notification"
              >
                Dismiss
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;