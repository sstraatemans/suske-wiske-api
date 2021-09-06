import { clearCache } from '@server/cache';
import { NewAlbumInput } from '@server/ql/resolvers';
import { getStore } from '.';
import { getById } from './getById';

export const updateById = async <T>(label: string, { input }: NewAlbumInput) => {
  const store = getStore();
  return store
    .collection(label)
    .doc(input.id)
    .update(input)
    .then(() => {
      clearCache(label);
      return getById(label, input.id);
    });
};
