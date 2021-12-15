import { clearCache } from '@server/cache';
import { doc, deleteDoc } from 'firebase/firestore';
import { getStore } from '.';

export const deleteById = async (label: string, id: string | string[]) => {
  if (typeof id !== 'string') return Promise.reject();
  const store = getStore();

  return deleteDoc(doc(store, label, id)).then(() => {
    clearCache(label);
  });
};
