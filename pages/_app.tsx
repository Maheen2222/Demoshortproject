// pages/_app.tsx
import '../styles/globals.css';
import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { logScreenView } from '../firebaseConfig'; 

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const trackPageView = (url: string) => {
      // Using the updated logScreenView function for custom page view events
      logScreenView(url);
    };

    // Listen to route changes and log page views
    router.events.on('routeChangeComplete', (url: string) => trackPageView(url));
    // Log the initial page view
    trackPageView(window.location.pathname + window.location.search);

    return () => {
      router.events.off('routeChangeComplete', (url: string) => trackPageView(url));
    };
  }, [router.events]);

  return <Component {...pageProps} />;
};

export default MyApp;
