import { clearCache } from '@server/cache';
import { doc, deleteDoc } from 'firebase/firestore';
import { getStore } from '.';
import { getCollection } from './utils';

export const deleteById = async (label: string, id: string | string[]) => {
  if (typeof id !== 'string') return Promise.reject();
  const store = getStore();

  return deleteDoc(doc(store, getCollection(label), id)).then(() => {
    clearCache(label);
  });
};
