import { Firestore, getFirestore } from 'firebase/firestore';

export const getStore = (): Firestore => {
  return getFirestore();
};
