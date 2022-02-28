export const getCollection = (label: string) => label;

export const addDefaultUpdateData = <T>(data: T, uid: string): T => {
  return { ...data, lastUpdateDate: new Date(), lastUpdateBy: uid };
};

export const addDefaultCreateData = <T extends { createDate: number }>(data: T, uid: string): T => {
  let innerData: T = { ...data };
  if (!data.createDate) {
    innerData = { ...innerData, createDate: new Date(), createdBy: uid };
  }

  return { ...addDefaultUpdateData(innerData, uid) };
};

export const findLabel = (url: string | undefined) => url?.split('/')[3];
