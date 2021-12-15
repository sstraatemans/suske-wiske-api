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

type SerieInput = {
  id: string;
};

type ArtistInput = {
  id: string;
};

type InventionInput = {
  id: string;
};

type CharacterInput = {
  id: string;
};

export type UpdateAlbumInput = {
  id: string;
  name: string;
  images: string[];
};

export type UpdateSerieInput = {
  id: string;
  name: string;
};

export type UpdateArtistInput = {
  id: string;
  name: string;
  images: string[];
};

export type UpdateInventionInput = {
  id: string;
  name: string;
  images: string[];
};

export type UpdateCharacterInput = {
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
    character: async (_: any, args: CharacterInput): Promise<Character | undefined> => {
      return await getById<Character>('characters', args.id);
    },
    inventions: async (): Promise<Invention[]> => {
      return await getAll<Invention>('inventions');
    },
    invention: async (_: any, args: InventionInput): Promise<Invention | undefined> => {
      return await getById<Invention>('inventions', args.id);
    },
    artists: async (): Promise<Artist[]> => {
      return await getAll<Artist>('artists');
    },
    artist: async (_: any, args: ArtistInput): Promise<Artist | undefined> => {
      return await getById<Artist>('artists', args.id);
    },
    series: async (): Promise<Serie[]> => {
      return await getAll<Serie>('series');
    },
    serie: async (_: any, args: SerieInput): Promise<Serie | undefined> => {
      return await getById<Serie>('series', args.id);
    },
  },
  Mutation: {
    updateAlbum: async (_: any, { input }: { input: UpdateAlbumInput }) => {
      return await updateById<UpdateAlbumInput>('albums', input);
    },
    updateSerie: async (_: any, { input }: { input: UpdateSerieInput }) => {
      return await updateById<UpdateSerieInput>('series', input);
    },
    updateArtist: async (_: any, { input }: { input: UpdateArtistInput }) => {
      return await updateById<UpdateArtistInput>('artists', input);
    },
    updateInvention: async (_: any, { input }: { input: UpdateInventionInput }) => {
      return await updateById<UpdateInventionInput>('inventions', input);
    },
    updateCharacter: async (_: any, { input }: { input: UpdateCharacterInput }) => {
      return await updateById<UpdateCharacterInput>('characters', input);
    },
  },
};
