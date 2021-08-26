import * as admin from 'firebase-admin';

export const initializeApp = () => {
  const privatekey: string = process.env.FIREBASE_PRIVATEKEY || '';
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: privatekey.replace(/\\n/g, '\n'),
      projectId: process.env.FIREBASE_PROJECTID,
      clientEmail: process.env.FIREBASE_EMAIL,
    }),
    databaseURL: `https://${process.env.FIREBASE_PROJECTID}.firebaseio.com`,
  });
};
