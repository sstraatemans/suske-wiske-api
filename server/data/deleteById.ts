import { clearCache } from '@server/cache';
import { getStore } from '.';
import { getById } from './getById';

export const deleteById = async (label: string, id: string | string[]) => {
  if (typeof id !== 'string') return Promise.reject();
  const store = getStore();

  return store
    .collection(label)
    .doc(id)
    .delete()
    .then(() => {
      clearCache(label);
    });
};
