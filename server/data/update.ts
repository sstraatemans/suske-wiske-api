import { clearCache } from '@server/cache';
import { getStore } from './store';
import { doc, setDoc, addDoc, collection, Timestamp } from 'firebase/firestore';

import { getCollection } from './utils';

export const updateById = async <T extends { id: string }>(label: string, input: T): Promise<T> => {
  if (!input.id && label === 'albums') {
    throw new Error('an album needs to have an ID (the number of the 4 colour album)');
  }

  const store = getStore();

  await setDoc(doc(store, getCollection(label), input.id), input);
  // clearCache(label);

  return input as unknown as T;
};

export const update = async <T extends { id: string }>(label: string, input: T): Promise<T> => {
  if (!input.id && label === 'albums') {
    throw new Error('an album needs to have an ID (the number of the 4 colour album)');
  }
  if (!input.id) {
    const store = getStore();

    const docRef = await addDoc(collection(store, getCollection(label)), input);
    // clearCache(label);

    return {
      ...input,
      id: docRef.id,
    } as unknown as T;
  }

  return await updateById<T>(label, input);
};
