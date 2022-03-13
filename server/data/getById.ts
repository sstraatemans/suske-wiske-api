import { getStore } from '.';
import { getDoc, doc } from 'firebase/firestore';
import { FirebaseDateToTimestamp } from '@server/date';
import { getCollection } from './utils';

export const getById = async <T extends { id: string }>(
  label: string,
  id: string
): Promise<T | undefined> => {
  const store = getStore();
  const ref = doc(store, getCollection(label), id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists) {
    return;
  }
  const data = {
    id,
    ...snapshot.data(),
  } as any as T;

  return {
    ...data,
    ...FirebaseDateToTimestamp(data),
  };
};
