import { DATAURLS } from './utils/constants';
import { useLoadData } from './utils/useLoadData';

export const useGetInventionQuery = (id: string) =>
  useLoadData<Invention>(`${DATAURLS.INVENTIONS}/${id}`);
