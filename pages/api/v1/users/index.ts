import { baseHandler } from '@server/baseHandler';
import { update } from '@server/data/update';
import { getDoc, doc } from 'firebase/firestore';

import { FirebaseDateToTimestamp, timeStampToFirebaseDate } from '@server/date';
import { getCollection } from '@server/data/utils';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { getStore } from '@server/data/store';
import { addDays } from 'date-fns';

const handler = baseHandler()
  .options(async (req, res) => {
    return res.status(200).send('ok');
  })
  .get(async (req, res) => {
    return res.status(200).json({});
  })
  .post(async (req, res) => {
    const { body } = req;

    const store = getStore();

    // TODO: check if that user already has an active account.
    const q = query(collection(store, 'users'), where('email', '==', body.email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(async (doc) => {
      const data = await doc.data();
      return res.status(409).json(
        FirebaseDateToTimestamp({
          alreadyExists: true,
          id: doc.id,
          expireDate: data.expireDate,
        })
      );
    });
    // if so, sent this data back. ask question if they want to create a new one or use this / these
    // maybe give a maximum per email address of 5

    // TODO: add the date until the data will be removed
    // TODO: copy all the data collections to this user

    const daysTillExpire = process.env.DAYS_TILL_EXPIRE ?? '7';
    const expireDate = addDays(Date.now(), parseInt(daysTillExpire, 10));
    const newBody = {
      ...body,
      expireDate: expireDate.getTime(),
    };

    const data = await update<User>('users', timeStampToFirebaseDate(newBody));
    return res.status(201).json(data);
  });

export default handler;
