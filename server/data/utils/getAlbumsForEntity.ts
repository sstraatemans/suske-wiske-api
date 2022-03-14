import { getAll } from '../getAll';

export const getAlbumsForEntity = async (id: string, label: LabelTypes): Promise<Album[]> => {
  const albums = await getAll<Album>('albums');

  return albums.filter((album) => {
    const prop = album[label];
    if (typeof prop === 'string') {
      return prop === id;
    }
    return prop?.includes(id);
  });
};
