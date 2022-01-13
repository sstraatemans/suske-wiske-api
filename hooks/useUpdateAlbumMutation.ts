import { useMutateData } from './utils/useMutateData';
import { DATAURLS } from './utils/constants';

export const useUpdateAlbumMutation = (id?: string) => useMutateData<Album>(DATAURLS.ALBUMS, id);
