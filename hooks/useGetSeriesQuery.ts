import { DATAURLS } from './utils/constants';
import { useLoadData } from './utils/useLoadData';

export const useGetSeriesQuery = () => useLoadData<ArrayResults<Serie>>(DATAURLS.SERIES);
