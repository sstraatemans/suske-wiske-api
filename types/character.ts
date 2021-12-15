export type Character = {
  id: string;
  name: string;
  albums: string[];
  images: string[];
  createDate?: Date;
  createdBy?: string;
  lastUpdateDate?: Date;
  lastUpdateBy?: string;
};

export type NewCharacter = {
  name: string;
};
