import '@/i18n';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

function Auth({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    if (!session && router.pathname !== '/auth/signin' && router.pathname !== '/auth/signup') {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <Auth>
          <Component {...pageProps} />
          <ToastContainer position="top-right" autoClose={3000} />
        </Auth>
      </Provider>
    </SessionProvider>
  );
}