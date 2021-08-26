import { Character } from './character';

export type Album = {
  id: string;
  name: string;
  firstPublicationDate: number;
  characters: string[];
  series: string[];
};
