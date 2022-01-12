import { useMutateData } from './utils/useMutateData';
import { DATAURLS } from './utils/constants';

export const useUpdateInventionMutation = (id: string) =>
  useMutateData<Invention>(`${DATAURLS.INVENTIONS}/${id}`);
