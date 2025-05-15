import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'react-i18next';

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
    location: '',
    preferredLanguage: 'en',
    themePreference: 'light',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock API call to update user profile
    console.log('Updating profile:', profile);
    // Assume success for demo purposes
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);

    // Update theme in localStorage if changed
    if (profile.themePreference) {
      localStorage.setItem('theme', profile.themePreference);
      document.documentElement.setAttribute('data-theme', profile.themePreference);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Please sign in to access settings.</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4">{t('settings')}</h1>
      <form onSubmit={handleSubmit} className="card p-6 space-y-4 max-w-lg mx-auto">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">{t('name')}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium">{t('email')}</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            disabled // Email typically can't be changed
          />
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium">{t('location')}</label>
          <input
            type="text"
            id="location"
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="e.g., New York, USA"
          />
        </div>
        <div>
          <label htmlFor="preferredLanguage" className="block text-sm font-medium">{t('preferredLanguage')}</label>
          <select
            id="preferredLanguage"
            name="preferredLanguage"
            value={profile.preferredLanguage}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
        </div>
        <div>
          <label htmlFor="themePreference" className="block text-sm font-medium">{t('themePreference')}</label>
          <select
            id="themePreference"
            name="themePreference"
            value={profile.themePreference}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-2 rounded hover:bg-opacity-80 transition-colors"
          style={{
            background: document.documentElement.getAttribute('data-theme') === 'light' ? '#3b82f6' : '#60a5fa',
            color: '#ffffff',
          }}
        >
          {t('save')}
        </button>
        {successMessage && (
          <p className="text-green-500 text-center">{successMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Settings;