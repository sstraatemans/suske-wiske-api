// Initialize Cloud Firestore through Firebase
import * as firebase from 'firebase/app';
import * as firebaseAdmin from 'firebase-admin';
import { Firestore, getFirestore } from 'firebase/firestore';

let firebaseAdminAppDefined = false;

const getApp = () => {
  if (!firebase.getApps().length) {
    return firebase.initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    });
  }

  return firebase.getApp(); // if already initialized, use that one
};

const getStore = (): Firestore => {
  getApp();
  return getFirestore();
};

const getFireBaseAdmin = () => {
  getApp();
  if (!firebaseAdmin.apps.length) {
    firebaseAdminAppDefined = true;
    return firebaseAdmin.initializeApp({
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DBURL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    });
  }
  return firebaseAdmin.app();
};

export { getFireBaseAdmin, getApp, getStore };
