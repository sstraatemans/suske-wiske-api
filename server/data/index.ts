// Initialize Cloud Firestore through Firebase
import * as firebase from 'firebase/app';
import * as firebaseAdmin from 'firebase-admin';

let firebaseAppDefined = false;

export const app = firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
});

setInterval(() => {
  if (!firebaseAppDefined) {
    if (firebase.getApp()) {
      firebaseAdmin.initializeApp({
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DBURL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
      });

      firebaseAppDefined = true;
    }
  }
}, 100);
