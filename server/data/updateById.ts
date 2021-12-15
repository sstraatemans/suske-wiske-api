import { clearCache } from '@server/cache';
import { getStore } from '.';
import { collection, doc, updateDoc, setDoc } from 'firebase/firestore';
import { getById } from './getById';
import { setCacheById } from '@server/cache';

const addDefaultUpdateData = <T>(data: T): T => {
  return { ...data, lastUpdateDate: new Date() };
};

const addDefaultCreateData = <T>(data: T): T => {
  return { ...addDefaultUpdateData(data), createDate: new Date() };
};

export const updateById = async <T extends { id: string }>(label: string, input: T): T => {
  const store = getStore();

  const newInput = addDefaultCreateData<T>(input);
  const data = await setDoc(doc(store, label, newInput.id), newInput);

  clearCache(label);

  return data as unknown as T;
};
