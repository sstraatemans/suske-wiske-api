type Album = {
  id: string;
  name: string;
  firstPublicationDate: number;
  scenarioArtist: string;
  cartoonArtist: string;
  wikiLink?: string;
  description: string;
  images: string[];
  createDate?: Date;
  createdBy?: string;
  lastUpdateDate?: Date;
  lastUpdateBy?: string;
  inventions: string[];
  characters: string[];
};

type NewAlbum = {
  name: string;
};

type Artist = {
  id: string;
  name: string;
  birthDate?: number;
  birthPlace?: string;
  debuteAlbum: string;
  debuteDate: number;
  wikiLink?: string;
  description: string;
  albumsAsCartoonist: EntityAlbumLink[];
  albumsAsScenarist: EntityAlbumLink[];
  images: string[];
  createDate?: Date;
  createdBy?: string;
  lastUpdateDate?: Date;
  lastUpdateBy?: string;
};

type NewArtist = {
  name: string;
};

type Character = {
  id: string;
  name: string;
  debuteAlbum: string;
  debuteDate: number;
  wikiLink?: string;
  description: string;
  albums: EntityAlbumLink[];
  images: string[];
  createDate?: Date;
  createdBy?: string;
  lastUpdateDate?: Date;
  lastUpdateBy?: string;
};

type NewCharacter = {
  name: string;
};

type Invention = {
  id: string;
  name: string;
  debuteAlbum: string;
  debuteDate: number;
  wikiLink?: string;
  description: string;
  albums: EntityAlbumLink[];
  images: string[];
  createDate?: Date;
  createdBy?: string;
  lastUpdateDate?: Date;
  lastUpdateBy?: string;
};

type Serie = {
  id: string;
  name: string;
  startYear: number;
  endYear?: number;
  wikiLink?: string;
  description: string;
  albums: SerieAlbumLink[];
  createDate?: Date;
  createdBy?: string;
  lastUpdateDate?: Date;
  lastUpdateBy?: string;
};

type SerieAlbumLink = {
  albumId: string;
  order: number;
};

type EntityAlbumLink = string;

type UpdateAlbumInput = {
  id: string;
  name: string;
  images: string[];
};

type UpdateSerieInput = {
  id: string;
  name: string;
  albums: EntityAlbumLink[];
};

type UpdateArtistInput = {
  id: string;
  name: string;
  images: string[];
  albums: EntityAlbumLink[];
};

type UpdateInventionInput = {
  id: string;
  name: string;
  images: string[];
  albums: EntityAlbumLink[];
};

type UpdateCharacterInput = {
  id: string;
  name: string;
  images: string[];
};

type ValueOf<T> = T[keyof T];

type ArrayResults<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};

type OptionProp = {
  id: string;
  name: string;
};

type SelectOptionProp = {
  option: OptionProp;
  handleSelectValue: (option: OptionProp) => void;
};

type User = {
  id: string;
  email: string;
  termsAgreed: boolean;
};
