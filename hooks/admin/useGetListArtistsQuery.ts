import { DATAURLS } from '../utils/constants';
import { useLoadData } from '../utils/useLoadData';

export const useGetListArtistsQuery = () =>
  useLoadData<ArrayResults<Artist>>(DATAURLS.ADMIN.ARTISTS);
