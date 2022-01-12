import { DATAURLS } from './utils/constants';
import { useLoadData } from './utils/useLoadData';

export const useGetCharacterQuery = (id: string) =>
  useLoadData<Character>(`${DATAURLS.CHARACTERS}/${id}`);
