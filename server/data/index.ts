import * as admin from 'firebase-admin';

let db: FirebaseFirestore.Firestore;

export const initializeApp = () => {
  const privatekey: string = process.env.FIREBASE_PRIVATEKEY || '';

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        privateKey: privatekey.replace(/\\n/g, '\n'),
        projectId: process.env.FIREBASE_PROJECTID,
        clientEmail: process.env.FIREBASE_EMAIL,
      }),
      databaseURL: `https://${process.env.FIREBASE_PROJECTID}.firebaseio.com`,
    });
  } catch (e) {}

  db = admin.firestore();
};

export const getStore = (): FirebaseFirestore.Firestore => {
  if (!db) initializeApp();

  return db;
};
