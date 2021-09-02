import { Album } from '@ts/album';
import { getAll } from '@server/data/getAll';
import { getById } from '@server/data/getById';

type AlbumInput = {
  id: string;
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
};
