// lib/firebaseConfig.ts
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAnalytics, isSupported, logEvent as firebaseLogEvent, setCurrentScreen } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBm7oMvgo45bQOCZ7n2HGpE4t9TnPMtXzA",
  authDomain: "fir-cee90.firebaseapp.com",
  projectId: "fir-cee90",
  storageBucket: "fir-cee90.appspot.com",
  messagingSenderId: "809452296338",
  appId: "1:809452296338:web:d859567da2aaa4e2886e4b",
  measurementId: "G-1LX52841ZM"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = isSupported().then((supported) => supported ? getAnalytics(app) : null);

export { analytics, firebaseLogEvent, setCurrentScreen };
