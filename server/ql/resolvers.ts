import { getAll } from '@server/data/getAll';
import { getById } from '@server/data/getById';
import { update } from '@server/data/update';

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
      return await update<UpdateAlbumInput>('albums', input);
    },
    updateSerie: async (_: any, { input }: { input: UpdateSerieInput }) => {
      return await update<UpdateSerieInput>('series', input);
    },
    updateArtist: async (_: any, { input }: { input: UpdateArtistInput }) => {
      return await update<UpdateArtistInput>('artists', input);
    },
    updateInvention: async (_: any, { input }: { input: UpdateInventionInput }) => {
      return await update<UpdateInventionInput>('inventions', input);
    },
    updateCharacter: async (_: any, { input }: { input: UpdateCharacterInput }) => {
      return await update<UpdateCharacterInput>('characters', input);
    },
  },
};
