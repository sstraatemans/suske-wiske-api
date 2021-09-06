import { Album } from '@ts/album';
import { getAll } from '@server/data/getAll';
import { getById } from '@server/data/getById';
import { updateById } from '@server/data/updateById';

type AlbumInput = {
  id: string;
};

export type NewAlbumInput = {
  input: {
    id: string;
    name: string;
  };
};

export const resolvers = {
  Query: {
    albums: async (): Promise<Album[]> => {
      return await getAll<Album>('albums');
    },
    album: async (_: any, args: AlbumInput): Promise<Album | undefined> => {
      return await getById<Album>('albums', args.id);
    },
  },
  Mutation: {
    updateAlbum: async (_: any, args: NewAlbumInput) => {
      return await updateById<Album>('albums', args);
    },
  },
};
