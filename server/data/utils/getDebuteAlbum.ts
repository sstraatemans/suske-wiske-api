import { getAll } from '../getAll';

const sortAlbumsOnPublicationDate = (a: Album, b: Album) => {
  return a.firstPublicationDate - b.firstPublicationDate;
};

export const getDebuteAlbum = async (albums: Album[]): Promise<Album | undefined> => {
  return albums?.filter((a) => a.firstPublicationDate).sort(sortAlbumsOnPublicationDate)[0];
};
