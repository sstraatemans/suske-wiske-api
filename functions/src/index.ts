import * as functions from 'firebase-functions';
// import * as firebaseAdmin from 'firebase-admin';

// firebaseAdmin.initializeApp();

export const createAdmin = functions.https.onRequest(async (req, res) => {
  // let d;
  // await firebaseAdmin.auth().setCustomUserClaims('badwpV9f6INMURTgX6mSpDZIA5J3', { admin: true });

  res.json({ result: `done again` });
});
