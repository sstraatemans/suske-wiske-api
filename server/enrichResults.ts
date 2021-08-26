import { Album } from '@types/album';
import { Serie } from '@types/serie';
import { getAll } from './data/getAll';

export const enrichSeries = async (results: Serie[]): Promise<Serie[]> => {
  return results.map((result) => {
    return {
      ...result,
      albums: result.albums.map((album) => `${process.env.APIURL}/albums/${album}`),
    };
  });
};

export const enrichAlbums = async (results: Album[]): Promise<Album[]> => {
  const series = await getAll<Serie>('series');

  return results.map((result) => {
    const inSeries: string[] = series
      .filter((serie: Serie) => serie.albums.indexOf(result.id) > -1)
      .map((serie: Serie) => `${process.env.APIURL}/series/${serie.id}`);

    return {
      ...result,
      characters: result.characters.map(
        (character) => `${process.env.APIURL}/characters/${character}`
      ),
      series: inSeries,
    };
  });
};
