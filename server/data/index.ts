// Initialize Cloud Firestore through Firebase
import { initializeApp } from 'firebase/app';
import {
  updateDoc,
  addDoc,
  DocumentReference,
  CollectionReference,
  WithFieldValue,
  UpdateData,
  doc as docFnc,
  DocumentData,
} from 'firebase/firestore';
import { Firestore, getFirestore } from 'firebase/firestore';

let db: Firestore;

export const init = () => {
  const privatekey: string = process.env.FIREBASE_PRIVATEKEY || '';

  try {
    const firebaseApp = initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    });
  } catch (e) {}

  db = getFirestore();
};

export const getStore = (): Firestore => {
  if (!db) init();

  return db;
};
