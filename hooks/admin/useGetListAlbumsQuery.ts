import { DATAURLS } from '../utils/constants';
import { useLoadData } from '../utils/useLoadData';

export const useGetListAlbumsQuery = () => useLoadData<ArrayResults<Album>>(DATAURLS.ADMIN.ALBUMS);
