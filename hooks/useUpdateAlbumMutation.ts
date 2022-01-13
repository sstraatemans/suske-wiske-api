import { useMutateData } from './utils/useMutateData';
import { DATAURLS } from './utils/constants';
import { Album } from 'types';

export const useUpdateAlbumMutation = (id?: string) => useMutateData<Album>(DATAURLS.ALBUMS, id);
