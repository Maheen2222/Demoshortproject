import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';
import { Console } from 'console';

const firebaseConfig = {
  apiKey: "AIzaSyBm7oMvgo45bQOCZ7n2HGpE4t9TnPMtXzA",
  authDomain: "fir-cee90.firebaseapp.com",
  projectId: "fir-cee90",
  storageBucket: "fir-cee90.appspot.com",
  messagingSenderId: "809452296338",
  appId: "1:809452296338:web:d859567da2aaa4e2886e4b",
  measurementId: "G-1LX52841ZM"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analyticsPromise = isSupported().then((supported) => supported ? getAnalytics(app) : null);

export const logScreenView = async (screenName: string) => {
  console.log("I am here",screenName);
  
  const analytics = await analyticsPromise;
  if (analytics) {
    // Logging a custom event instead of using 'screen_view'
    logEvent(analytics, 'page_view', {
      page_path: screenName,
      
      
    });
  }
};

export { analyticsPromise as analytics };
