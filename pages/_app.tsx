// pages/_app.tsx
import '../styles/globals.css';
import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { analytics, firebaseLogEvent, setCurrentScreen } from '../firebaseConfig'; 

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const trackPageView = (url: string) => {
      // Ensure analytics is initialized and supported
      analytics.then((instance) => {
        if (instance) {
          setCurrentScreen(instance, url);
          firebaseLogEvent(instance, 'screen_view');
        }
      });
    };

    router.events.on('routeChangeComplete', trackPageView);
    // Track the initial page view
    trackPageView(window.location.pathname);

    return () => {
      router.events.off('routeChangeComplete', trackPageView);
    };
  }, [router.events]);

  return <Component {...pageProps} />;
};

export default MyApp;
