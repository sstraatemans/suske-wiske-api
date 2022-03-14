import { getAll } from './data/getAll';
import { getAlbumsForEntity } from './data/utils/getAlbumsForEntity';
import { getDebuteAlbum } from './data/utils/getDebuteAlbum';

export const enrichSeries = async (results: Serie[]): Promise<Serie[]> => {
  return results.map((result) => {
    return {
      url: `${process.env.APIURL}/v1/series/${result.id}`,
      ...result,
    };
  });
};

export const enrichAlbums = async (results: Album[]): Promise<Album[]> => {
  return results.map((result) => {
    return {
      url: `${process.env.APIURL}/v1/albums/${result.id}`,
      ...result,
    };
  });
};

export const enrichCharacters = async (result: any): Promise<any> => {
  return {
    ...result,
  };
};

export const enrichArtist = async (result: any): Promise<any> => {
  const scenarioArtistAlbums = await getAlbumsForEntity(result.id, 'scenarioArtist');
  const cartoonArtistAlbums = await getAlbumsForEntity(result.id, 'cartoonArtist');
  const albums = [...scenarioArtistAlbums, ...cartoonArtistAlbums];
  return {
    ...result,
    albums,
  };
};

export const enrichInvention = async (result: any): Promise<any> => {
  return {
    ...result,
  };
};

export const enrichData = async <T>(data: any[], label: LabelTypes): Promise<T[] | void[]> => {
  const promises = data.map(async (result) => {
    const albums = await getAlbumsForEntity(result.id, label);
    let newResult: any = {
      ...result,
      albums,
      url: `${process.env.APIURL}/v1/${label}/${result.id}`,
    };

    switch (label) {
      case 'characters':
        newResult = await enrichCharacters(newResult);
        break;
      case 'artists':
        newResult = await enrichArtist(newResult);
        break;
      case 'inventions':
        newResult = await enrichInvention(newResult);
        break;
    }

    const debutealbum = await getDebuteAlbum(newResult.albums);
    if (debutealbum) {
      newResult.debuteAlbum = { id: debutealbum?.id, name: debutealbum?.name };
      newResult.debuteDate = debutealbum.firstPublicationDate;
    }

    newResult.albums = newResult.albums.map((a: Album) => ({
      id: a.id,
      name: a.name,
      url: a.url,
    }));

    return newResult as T;
  });
  return Promise.all(promises).then((res) => res);
};
