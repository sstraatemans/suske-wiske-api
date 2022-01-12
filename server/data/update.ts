import { clearCache } from '@server/cache';
import { getStore } from '.';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';

const addDefaultUpdateData = <T>(data: T): T => {
  return { ...data, lastUpdateDate: new Date() };
};

const addDefaultCreateData = <T>(data: T): T => {
  return { ...addDefaultUpdateData(data), createDate: new Date() };
};

export const updateById = async <T extends { id: string }>(label: string, input: T): Promise<T> => {
  const store = getStore();

  const newInput = addDefaultCreateData<T>(input);
  const data = await setDoc(doc(store, label, newInput.id), newInput);

  clearCache(label);

  return data as unknown as T;
};

export const update = async <T extends { id: string }>(label: string, input: T): Promise<T> => {
  if (!input.id) {
    const store = getStore();

    const newInput = addDefaultCreateData<T>(input);
    const docRef = await addDoc(collection(store, label), newInput);
    clearCache(label);

    return {
      ...newInput,
      id: docRef.id,
    } as unknown as T;
  }

  return await updateById<T>(label, input);
};
