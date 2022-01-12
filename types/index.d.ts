type Album = {
  id: string;
  name: string;
  firstPublicationDate: number;
  images: string[];
};

type NewAlbum = {
  name: string;
};

type Artist = {
  id: string;
  name: string;
  albums: EntityAlbumLink[];
  images: [];
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
  albums: EntityAlbumLink[];
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
  albums: EntityAlbumLink[];
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
