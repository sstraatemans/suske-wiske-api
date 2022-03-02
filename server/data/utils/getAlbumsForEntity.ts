import { getAll } from '../getAll';

export const getAlbumsForEntity = async (
  id: string,
  label: 'characters'
): Promise<{ id: string; name: string }[]> => {
  const albums = await getAll<Album>('albums');

  return albums
    .filter((album) => album[label]?.includes(id))
    .map((album) => ({
      id: album.id,
      name: album.name,
    }));
};
