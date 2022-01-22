import { getAll } from './data/getAll';

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

export const enrichCharacters = async (results: Character[]): Promise<Character[]> => {
  const series = await getAll<Character>('characters');

  return results.map((result) => {
    return {
      url: `${process.env.APIURL}/v1/characters/${result.id}`,
      ...result,
    };
  });
};

export const enrichArtist = async (results: Artist[]): Promise<Artist[]> => {
  return results.map((result) => {
    return {
      url: `${process.env.APIURL}/v1/artists/${result.id}`,
      ...result,
    };
  });
};

export const enrichInvention = async (results: Invention[]): Promise<Invention[]> => {
  const series = await getAll<Invention>('inventions');

  return results.map((result) => {
    return {
      url: `${process.env.APIURL}/v1/inventions/${result.id}`,
      ...result,
    };
  });
};
