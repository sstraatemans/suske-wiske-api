import { getCache, setCache } from '@server/cache';
import { getStore } from '.';
import { collection, getDocs } from 'firebase/firestore';
import { FirebaseDateToTimestamp } from '@server/date';
import { getCollection } from './utils';

export const getAll = async <T>(label: string): Promise<T[]> => {
  //const cachedData: T[] = getCache(label);
  // if (cachedData) {
  //   console.log(`use Cache ${label}`);
  //   return cachedData;
  // }

  const store = getStore();

  const snapshot = await getDocs(collection(store, getCollection(label)));
  const data = snapshot.docs.map((doc): T => {
    return {
      id: doc.id,
      ...FirebaseDateToTimestamp(doc.data()),
    } as any as T;
  });

  setCache(label, data);

  return data;
};
