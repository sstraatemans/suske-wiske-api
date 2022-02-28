// Initialize Cloud Firestore through Firebase
import { initializeApp, getApps } from 'firebase/app';
import * as firebaseAdmin from 'firebase-admin';

let initApp;

setTimeout(() => {
  initApp = initializeApp(
    {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    },
    'DEFAULT'
  );
}, 1000);

export const app = initApp;

firebaseAdmin.initializeApp({
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DBURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
});
