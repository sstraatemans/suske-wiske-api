import { clearCache } from '@server/cache';
import { Character } from '@ts/character';
import { getStore } from '.';
import { getAll } from './getAll';
import { getById } from './getById';

export const createNode = async <T>(label: string, input: T) => {
  const store = getStore();

  // get last Id and add 1
  const allData = await getAll<Character>('characters');
  let id: number = -1;
  allData.forEach((data) => {
    const dataId = parseInt(data.id, 10);
    if (!id || id < dataId) id = dataId;
  });
  const newId = `${id + 1}`;

  return store
    .doc(`${label}/${newId}`)
    .set({ albums: [], ...input })
    .then((result) => {
      clearCache(label);
      return getById<Character>(label, newId);
    });
};
