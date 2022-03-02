// Initialize Cloud Firestore through Firebase
import * as firebase from 'firebase/app';
import * as firebaseAdmin from 'firebase-admin';

let firebaseAppDefined = false;
let app: firebase.FirebaseApp;

const interval = setInterval(async () => {
  if (!firebaseAppDefined) {
    if (!app) {
      app = await firebase.initializeApp({
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
      });

      await firebaseAdmin.initializeApp({
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DBURL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
      });

      firebaseAppDefined = true;
    }
  } else {
    clearInterval(interval);
  }
}, 100);

const getApp = () => app;

export { firebaseAdmin, getApp };
