export type Album = {
  id: string;
  name: string;
  firstPublicationDate: number;
  characters: string[];
  series: string[];
};

export type NewAlbum = {
  name: string;
};
