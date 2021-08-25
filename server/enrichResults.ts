import { Album } from '@types/album';
import { Serie } from '@types/serie';
import Series from '@data/series';

export const enrichSeries = (results: Serie[]): Serie[] => {
  return results.map((result) => {
    return {
      ...result,
      albums: result.albums.map((album) => `http://localhost:3000/api/v1/nl/albums/${album}`),
    };
  });
};

export const enrichAlbums = (results: Album[]): Album[] => {
  return results.map((result) => {
    const inSeries: string[] = Series.filter(
      (serie: Serie) => serie.albums.indexOf(result.id) > -1
    ).map((serie: Serie) => `http://localhost:3000/api/v1/nl/series/${serie.id}`);

    return {
      ...result,
      characters: result.characters.map(
        (character) => `http://localhost:3000/api/v1/nl/characters/${character}`
      ),
      series: inSeries,
    };
  });
};
