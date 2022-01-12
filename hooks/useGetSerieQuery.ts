import { useLoadData } from './utils/useLoadData';
import { DATAURLS } from './utils/constants';

export const useGetSerieQuery = (id: string) => useLoadData<Serie>(`${DATAURLS.SERIES}/${id}`);
