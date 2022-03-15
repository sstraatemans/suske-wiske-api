import { getAlbumsForEntity } from './data/utils/getAlbumsForEntity';
import { getDebuteAlbum } from './data/utils/getDebuteAlbum';
import { minimizeEntity, minimizeEntities } from './data/utils/minimizeEntity';

export const enrichSeries = async (results: Serie[]): Promise<Serie[]> => {
  return results.map((result) => {
    return {
      url: `${process.env.APIURL}/v1/series/${result.id}`,
      ...result,
    };
  });
};

export const enrichAlbums = async (result: any): Promise<any> => {
  return {
    ...result,
  };
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

export const enrichDevice = async (result: any): Promise<any> => {
  return {
    ...result,
  };
};

export const enrichData = async <T>(data: any[], label: LabelTypes): Promise<T[] | void[]> => {
  const promises = data.map(async (result) => {
    let newResult: any = {
      ...result,
      url: `${process.env.APIURL}/v1/${label}/${result.id}`,
    };

    if (label !== 'albums' && label !== 'series') {
      const albums = await getAlbumsForEntity(newResult.id, label);
      newResult.albums = albums;
    }

    switch (label) {
      case 'albums':
        newResult = await enrichCharacters(newResult);
        break;
      case 'characters':
        newResult = await enrichCharacters(newResult);
        break;
      case 'artists':
        newResult = await enrichArtist(newResult);
        break;
      case 'devices':
        newResult = await enrichDevice(newResult);
        break;
    }

    if (label !== 'albums' && label !== 'series') {
      const debutealbum = await getDebuteAlbum(newResult.albums);
      if (debutealbum) {
        newResult.debuteAlbum = minimizeEntity<Album>(debutealbum, label);
        newResult.debuteDate = debutealbum.firstPublicationDate;
      }

      newResult.albums = minimizeEntities<Album>(newResult.albums, label);
    }

    return newResult as T;
  });
  return Promise.all(promises).then((res) => res);
};
