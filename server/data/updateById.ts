import { clearCache } from '@server/cache';
import { getStore } from '.';
import { getById } from './getById';

export const updateById = async <T extends { id: string }>(label: string, input: T) => {
  const store = getStore();

  console.log(input);
  return store
    .collection(label)
    .doc(input.id)
    .update(input)
    .then(() => {
      clearCache(label);
      return getById(label, input.id);
    });
};
