import { clearCache } from '@server/cache';
import { getStore } from '.';
import { doc, setDoc, addDoc, collection, Timestamp } from 'firebase/firestore';
import { timeStampToFirebaseDate } from '@server/date';
import { getCollection } from './utils';

const addDefaultUpdateData = <T>(data: T): T => {
  return { ...data, lastUpdateDate: new Date() };
};

const addDefaultCreateData = <T>(data: T): T => {
  return { ...addDefaultUpdateData(data), createDate: new Date() };
};

export const updateById = async <T extends { id: string }>(label: string, input: T): Promise<T> => {
  if (!input.id && label === 'albums') {
    throw new Error('an album needs to have an ID (the number of the 4 colour album)');
  }

  const store = getStore();

  const newInput = {
    ...timeStampToFirebaseDate(addDefaultCreateData<T>(input)),
  };
  await setDoc(doc(store, getCollection(label), newInput.id), newInput);
  // clearCache(label);

  return newInput as unknown as T;
};

export const update = async <T extends { id: string }>(label: string, input: T): Promise<T> => {
  if (!input.id && label === 'albums') {
    throw new Error('an album needs to have an ID (the number of the 4 colour album)');
  }
  if (!input.id) {
    const store = getStore();

    const newInput = { ...timeStampToFirebaseDate(addDefaultCreateData<T>(input)) };
    const docRef = await addDoc(collection(store, getCollection(label)), newInput);
    // clearCache(label);

    return {
      ...newInput,
      id: docRef.id,
    } as unknown as T;
  }

  return await updateById<T>(label, input);
};
