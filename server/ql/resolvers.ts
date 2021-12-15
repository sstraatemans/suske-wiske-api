import { Album } from '@ts/album';
import { Character } from '@ts/character';
import { Invention } from '@ts/invention';
import { Artist } from '@ts/artist';
import { Serie } from '@ts/serie';
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
    characters: async (): Promise<Character[]> => {
      return await getAll<Character>('characters');
    },
    inventions: async (): Promise<Invention[]> => {
      return await getAll<Invention>('inventions');
    },
    artists: async (): Promise<Artist[]> => {
      return await getAll<Artist>('artists');
    },
    series: async (): Promise<Serie[]> => {
      return await getAll<Serie>('series');
    },
  },
  Mutation: {
    updateAlbum: async (_: any, { input }: { input: UpdateAlbumInput }) => {
      return await updateById<UpdateAlbumInput>('albums', input);
    },
  },
};
