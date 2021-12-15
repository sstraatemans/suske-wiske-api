export type Artist = {
  id: string;
  name: string;
  albums: string[];
  images: [];
  createDate?: Date;
  createdBy?: string;
  lastUpdateDate?: Date;
  lastUpdateBy?: string;
};

export type NewArtist = {
  name: string;
};
