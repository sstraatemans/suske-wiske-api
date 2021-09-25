import { clearCache } from '@server/cache';
import { getStore } from '.';
import { getAll } from './getAll';
import { getById } from './getById';

const addDefaultCreateData = <T>(data: T): T => {
  return { albums: [], ...data, createDate: new Date(), lastUpdateDate: new Date() };
};

export const createNode = async <T extends { id: string }>(label: string, input: T) => {
  const store = getStore();

  // get last Id and add 1
  const allData = await getAll<T>(label);
  let id: number = -1;
  allData.forEach((data) => {
    const dataId = parseInt(data.id, 10);
    if (!id || id < dataId) id = dataId;
  });
  const newId = `${id + 1}`;

  return store
    .doc(`${label}/${newId}`)
    .set(addDefaultCreateData<T>(input))
    .then((_) => {
      clearCache(label);
      return getById<T>(label, newId);
    });
};
