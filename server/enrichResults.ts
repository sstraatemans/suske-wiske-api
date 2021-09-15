import { Album } from '@ts/album';
import { Serie } from '@ts/serie';
import { getAll } from './data/getAll';

export const enrichSeries = async (results: Serie[]): Promise<Serie[]> => {
  return results.map((result) => {
    return {
      url: `${process.env.APIURL}/v1/series/${result.id}`,
      ...result,
      albums: result.albums.map((album) => `${process.env.APIURL}/v1/albums/${album}`),
    };
  });
};

export const enrichAlbums = async (results: Album[]): Promise<Album[]> => {
  const series = await getAll<Serie>('series');

  return results.map((result) => {
    const inSeries: string[] = series
      .filter((serie: Serie) => serie.albums.indexOf(result.id) > -1)
      .map((serie: Serie) => `${process.env.APIURL}/v1/series/${serie.id}`);

    return {
      url: `${process.env.APIURL}/v1/albums/${result.id}`,
      ...result,
      characters: result.characters.map(
        (character) => `${process.env.APIURL}/v1/characters/${character}`
      ),
      series: inSeries,
    };
  });
};
