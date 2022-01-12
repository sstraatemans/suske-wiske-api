import { DATAURLS } from './utils/constants';
import { useLoadData } from './utils/useLoadData';

export const useGetAlbumQuery = (id: string) => useLoadData<Album>(`${DATAURLS.ALBUMS}/${id}`);
