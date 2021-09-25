import { clearCache } from '@server/cache';
import { getStore } from '.';
import { getById } from './getById';

const addDefaultCreateData = <T>(data: T): T => {
  return { ...data, lastUpdateDate: new Date() };
};

export const updateById = async <T extends { id: string }>(label: string, input: T) => {
  const store = getStore();

  return store
    .collection(label)
    .doc(input.id)
    .update(addDefaultCreateData<T>(input))
    .then(() => {
      clearCache(label);
      return getById(label, input.id);
    });
};
