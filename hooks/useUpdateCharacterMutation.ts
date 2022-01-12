import { useMutateData } from './utils/useMutateData';
import { DATAURLS } from './utils/constants';

export const useUpdateCharacterMutation = (id: string) =>
  useMutateData<Character>(`${DATAURLS.CHARACTERS}/${id}`);
