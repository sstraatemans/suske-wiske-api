// Initialize Cloud Firestore through Firebase
import * as firebase from 'firebase/app';
import * as firebaseAdmin from 'firebase-admin';
import { Firestore, getFirestore } from 'firebase/firestore';

let firebaseAdminAppDefined = false;

const getApp = () => {
  console.log('firebase');
  console.log('firebase', firebase.getApps().length);
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
  console.log('store');
  getApp();
  return getFirestore();
};

const getFireBaseAdmin = () => {
  console.log(1);
  getApp();
  console.log(2);
  if (!firebaseAdmin.apps.length) {
    firebaseAdminAppDefined = true;
    console.log(3);
    return firebaseAdmin.initializeApp({
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DBURL,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
    });
  }
  console.log(4);
  return firebaseAdmin.app();
};

export { getFireBaseAdmin, getApp, getStore };
