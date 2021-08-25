import { Character } from './character';

export type Album = {
  id: string;
  name: string;
  characters: string[];
};

export type AlbumEnriched = Omit<Album, 'characters'> & {
  characters: Character[];
};
