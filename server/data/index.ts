// Initialize Cloud Firestore through Firebase
import { initializeApp } from 'firebase/app';
import * as firebaseAdmin from 'firebase-admin';

export const app = initializeApp(
  {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  },
  '1'
);

firebaseAdmin.initializeApp({
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DBURL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
});
