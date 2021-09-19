export type Character = {
  id: string;
  name: string;
  albums: string[];
  createDate?: Date;
  createdBy?: string;
  lastUpdateDate?: Date;
  lastUpdateBy?: string;
};

export type NewCharacter = {
  name: string;
};
