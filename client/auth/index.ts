import { initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DBURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
