import { getAll } from '../getAll';

const sortAlbumsOnPublicationDate = (a: Album, b: Album) => {
  return a.firstPublicationDate - b.firstPublicationDate;
};

export const getDebuteAlbum = async (id: string, label: string): Promise<Album> => {
  const albums = await getAll<Album>('albums');

  return albums.filter((a) => a.firstPublicationDate).sort(sortAlbumsOnPublicationDate)[0];
};
