type BasicType = {
  id: string;
  name: string;
  wikiLink?: string;
  description: string;
  createDate?: Date;
  createdBy?: string;
  lastUpdateDate?: Date;
  lastUpdateBy?: string;
  images: string[];
  uid?: String;
};

type Album = BasicType & {
  firstPublicationDate: number;
  scenarioArtist: string;
  cartoonArtist: string;
  inventions: string[];
  characters: string[];
};

type NewAlbum = {
  name: string;
};

type Artist = BasicType & {
  birthDate?: number;
  birthPlace?: string;
  debuteAlbum: string;
  debuteDate: number;
  albumsAsCartoonist: EntityAlbumLink[];
  albumsAsScenarist: EntityAlbumLink[];
};

type NewArtist = {
  name: string;
};

type Character = BasicType & {
  debuteAlbum: {
    id: string;
    name: string;
  };
  debuteDate: number;
  albums: EntityAlbumLink[];
};

type NewCharacter = {
  name: string;
};

type Invention = BasicType & {
  debuteAlbum: string;
  debuteDate: number;
  albums: EntityAlbumLink[];
};

type Serie = BasicType & {
  startYear: number;
  endYear?: number;
  albums: SerieAlbumLink[];
};

type SerieAlbumLink = {
  albumId: string;
  order: number;
};

type EntityAlbumLink =
  | string
  | {
      id: string;
      name: string;
    };

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
  alreadyExists: boolean;
  expireDate: Date;
};
