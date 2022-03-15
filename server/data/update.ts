import { clearCache } from '@server/cache';
import { getApp, getStore } from '.';
import { doc, setDoc, addDoc, collection, Timestamp } from 'firebase/firestore';

import { getCollection } from './utils';

export const updateById = async <T extends { id: string }>(label: string, input: T): Promise<T> => {
  if (!input.id && label === 'albums') {
    throw new Error('an album needs to have an ID (the number of the 4 colour album)');
  }

  const app = await getApp();

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

    const newDocRef = await doc(collection(store, label));
    const tempInput = { ...input, id: newDocRef.id };

    const updatedInput = await updateById(label, tempInput);

    return {
      ...updatedInput,
    } as unknown as T;
  }

  return await updateById<T>(label, input);
};
