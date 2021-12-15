type Album = {
  id: string;
  name: string;
  firstPublicationDate: number;
  characters: string[];
  series: string[];
};

type NewAlbum = {
  name: string;
};

type Artist = {
  id: string;
  name: string;
  albums: string[];
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
  albums: string[];
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
  albums: string[];
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
  albums: string[];
};
