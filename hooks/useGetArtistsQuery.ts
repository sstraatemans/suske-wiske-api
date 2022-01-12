import { DATAURLS } from './utils/constants';
import { useLoadData } from './utils/useLoadData';

export const useGetArtistsQuery = () => useLoadData<ArrayResults<Artist>>(DATAURLS.ARTISTS);
