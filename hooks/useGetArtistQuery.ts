import { DATAURLS } from './utils/constants';
import { useLoadData } from './utils/useLoadData';

export const useGetArtistQuery = (id: string) => useLoadData<Artist>(`${DATAURLS.ARTISTS}/${id}`);
