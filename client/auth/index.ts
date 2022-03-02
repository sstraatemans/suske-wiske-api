import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DBURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
};

let firebaseAppDefined = false;
const interval = setInterval(async () => {
  if (!firebaseAppDefined) {
    if (!getApps().length) {
      await initializeApp(firebaseConfig);

      firebaseAppDefined = true;
    }
  } else {
    clearInterval(interval);
  }
}, 100);
