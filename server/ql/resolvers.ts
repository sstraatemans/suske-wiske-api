import { Album } from '@ts/album';
import { getAll } from '@server/data/getAll';
import { getById } from '@server/data/getById';
import { updateById } from '@server/data/updateById';

type AlbumInput = {
  id: string;
};

export type UpdateAlbumInput = {
  id: string;
  name: string;
  images: string[];
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
    updateAlbum: async (_: any, { input }: { input: UpdateAlbumInput }) => {
      return await updateById<UpdateAlbumInput>('albums', input);
    },
  },
};
