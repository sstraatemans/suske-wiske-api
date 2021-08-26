import { Album } from '@types/album';
import { Serie } from '@types/serie';
import Series from '@data/series';

export const enrichSeries = (results: Serie[]): Serie[] => {
  console.log(process.env.APIURL);
  return results.map((result) => {
    return {
      ...result,
      albums: result.albums.map((album) => `${process.env.APIURL}/albums/${album}`),
    };
  });
};

export const enrichAlbums = (results: Album[]): Album[] => {
  return results.map((result) => {
    const inSeries: string[] = Series.filter(
      (serie: Serie) => serie.albums.indexOf(result.id) > -1
    ).map((serie: Serie) => `${process.env.APIURL}/series/${serie.id}`);

    return {
      ...result,
      characters: result.characters.map(
        (character) => `${process.env.APIURL}/nl/characters/${character}`
      ),
      series: inSeries,
    };
  });
};
