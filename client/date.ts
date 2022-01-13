import { Timestamp } from 'firebase/firestore';

export const createTimestamp = (date: Timestamp) => {
  return date?.seconds ? date?.seconds : date;
};
