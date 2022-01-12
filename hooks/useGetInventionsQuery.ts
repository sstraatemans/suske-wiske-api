import { DATAURLS } from './utils/constants';
import { useLoadData } from './utils/useLoadData';

export const useGetInventionsQuery = () =>
  useLoadData<ArrayResults<Invention>>(DATAURLS.INVENTIONS);
