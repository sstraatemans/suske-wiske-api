import { getAll } from './data/getAll';

export const enrichSeries = async (results: Serie[]): Promise<Serie[]> => {
  return results.map((result) => {
    return {
      url: `${process.env.APIURL}/v1/series/${result.id}`,
      ...result,
      albums: result.albums?.map((album) => `${process.env.APIURL}/v1/albums/${album}`) ?? [],
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
      series: inSeries,
    };
  });
};

export const enrichCharacters = async (results: Character[]): Promise<Character[]> => {
  const series = await getAll<Character>('characters');

  return results.map((result) => {
    return {
      url: `${process.env.APIURL}/v1/characters/${result.id}`,
      ...result,
      albums: result.albums?.map((album) => `${process.env.APIURL}/v1/albums/${album}`) ?? [],
    };
  });
};

export const enrichArtist = async (results: Artist[]): Promise<Artist[]> => {
  const series = await getAll<Artist>('artists');

  return results.map((result) => {
    return {
      url: `${process.env.APIURL}/v1/artists/${result.id}`,
      ...result,
      albums: result.albums.map((album) => `${process.env.APIURL}/v1/albums/${album}`),
    };
  });
};

export const enrichInvention = async (results: Invention[]): Promise<Invention[]> => {
  const series = await getAll<Invention>('inventions');

  return results.map((result) => {
    return {
      url: `${process.env.APIURL}/v1/inventions/${result.id}`,
      ...result,
      albums: result.albums.map((album) => `${process.env.APIURL}/v1/albums/${album}`),
    };
  });
};
