import { getCache, setCacheById } from '@server/cache';
import { getStore } from '.';
import { getDoc, doc } from 'firebase/firestore';
import { FirebaseDateToTimestamp } from '@server/date';

// check if certain required props are there. if not, add default value
const makeBackwardsCompatible = <
  T extends { id: string; albums?: Album[]; characters?: Character[] }
>(
  data: T
): T => {
  // for backwards compatibility
  if (!isOfType<T>(data, 'albums')) data.albums = [];
  if (!isOfType<T>(data, 'characters')) data.characters = [];

  return data;
};

export const getById = async <T extends { id: string }>(
  label: string,
  id: string
): Promise<T | undefined> => {
  const cachedData: T[] = getCache(label);
  if (cachedData) {
    console.log(`use Cache ${label}`, id);

    const data = cachedData.find((item) => item?.id === id) as T;

    return makeBackwardsCompatible(data);
  }

  const store = getStore();

  const ref = doc(store, label, id);
  const snapshot = await getDoc(ref);

  if (!snapshot.exists) {
    return;
  }
  const data = {
    id,
    ...snapshot.data(),
  } as any as T;

  setCacheById(label, FirebaseDateToTimestamp<T>(makeBackwardsCompatible(data)));

  return getById<T>(label, id);
};

export const isOfType = <T>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T
): varToBeChecked is T => (varToBeChecked as T)[propertyToCheckFor] !== undefined;
