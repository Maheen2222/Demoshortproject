// pages/_app.tsx

import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { usePathname, useSearchParams } from 'next/navigation';
import { logScreenView } from '../firebaseConfig'; 


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  console.log("MyApp is being called");
  const pathname = usePathname();
  const searchParams = useSearchParams();
// this code is setting up a side
// effect with useEffect that logs a screen view event whenever the user navigates to a different page in your app.
  useEffect(() => {
    const url = pathname + searchParams.toString();
    logScreenView(url);
    
  }, [pathname, searchParams]);

  return <Component {...pageProps} />;
};

export default MyApp;
