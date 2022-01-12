import { DATAURLS } from './utils/constants';
import { useLoadData } from './utils/useLoadData';

export const useGetAlbumsQuery = () => useLoadData<ArrayResults<Album>>(DATAURLS.ALBUMS);
