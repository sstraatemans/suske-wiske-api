import { Timestamp } from 'firebase/firestore';

//check if this is a date. and then convert to firestore timestamp
export const timeStampToFirebaseDate = <T>(data: T): T => {
  Object.entries(data).map(([key, value]) => {
    const newKey = key as keyof typeof data;
    if (key.endsWith('Date') && Number.isInteger(value)) {
      console.log(value, newKey);
      data[newKey] = new Timestamp(Math.round(value / 1000), 0) as unknown as any;
    }
  });
  return data;
};

//check if this is a date. and then convert to firestore timestamp
export const FirebaseDateToTimestamp = <T>(data: T): T => {
  Object.entries(data).map(([key, value]) => {
    const newKey = key as keyof typeof data;
    if (key.endsWith('Date') && value.hasOwnProperty('seconds')) {
      data[newKey] = (value.seconds * 1000) as unknown as any;
    }
  });
  return data;
};
