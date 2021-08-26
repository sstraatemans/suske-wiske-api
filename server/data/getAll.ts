import { getCache, setCache } from '@server/cache';
import { getStore } from '.';

export const getAll = async <T>(label: string): Promise<T[]> => {
  const cachedData: T[] = getCache(label);
  if (cachedData) {
    console.log(`use Cache ${label}`);
    return cachedData;
  }

  const store = getStore();

  const snapshot = await store.collection(label).get();
  const data = snapshot.docs.map((doc): T => {
    return {
      id: doc.id,
      ...doc.data(),
    } as any as T;
  });

  setCache(label, data);

  return data;
};
