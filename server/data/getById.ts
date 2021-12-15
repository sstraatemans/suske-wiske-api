import { getCache, setCacheById } from '@server/cache';
import { getStore } from '.';
import { getDoc, doc } from 'firebase/firestore';

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

  const ref = doc(store, label, id);
  const snapshot = await getDoc(ref);
  console.log(snapshot.data());

  const data = {
    id,
    ...snapshot.data(),
  } as any as T;

  setCacheById(label, data);

  return getById<T>(label, id);
};
