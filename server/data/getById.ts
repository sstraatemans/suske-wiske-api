import { getCache, setCache } from '@server/cache';
import { getStore } from '.';

export const getById = async <T extends { id: string }>(
  label: string,
  id: string
): Promise<T | undefined> => {
  const cachedData: T[] = getCache(label);
  if (cachedData) {
    console.log(`use Cache ${label}`, id);
    return cachedData.find((item) => item?.id === id) as T;
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

  return getById<T>(label, id);
};
