import { useMutateData } from './utils/useMutateData';
import { DATAURLS } from './utils/constants';

export const useUpdateSerieMutation = (id: string) =>
  useMutateData<Serie>(`${DATAURLS.SERIES}/${id}`);
