import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
//const admin = require('firebase-admin');
// admin.initializeApp();

exports.createAdmin = functions.https
  .onRequest
  // async (req: NextApiRequest, res: NextApiResponse) => {
  //   // Grab the text parameter.
  //   const original = req.query.text;
  //   // Push the new message into Firestore using the Firebase Admin SDK.
  //   const writeResult = await admin.firestore().collection('messages').add({ original: original });
  //   // Send back a message that we've successfully written the message
  //   res.json({ result: `Message with ID: ${writeResult.id} added.` });
  // }
  ();
