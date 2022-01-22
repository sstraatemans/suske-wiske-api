import { DATAURLS } from '../utils/constants';
import { useLoadData } from '../utils/useLoadData';

export const useGetListInventionsQuery = () =>
  useLoadData<ArrayResults<Invention>>(DATAURLS.ADMIN.INVENTIONS);
