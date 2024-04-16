'use client'
import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { logScreenView } from '../../firebaseConfig';

const ScreenViewLogger: React.FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = pathname + searchParams.toString();
    logScreenView(url);
  }, [pathname, searchParams]);

  // Render a placeholder to indicate that the component is mounted
  return <div></div>;
};

export default ScreenViewLogger;