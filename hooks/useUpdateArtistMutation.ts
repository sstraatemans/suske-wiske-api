import { useMutateData } from './utils/useMutateData';
import { DATAURLS } from './utils/constants';

export const useUpdateArtistMutation = (id: string) =>
  useMutateData<Artist>(`${DATAURLS.ARTISTS}/${id}`);
