import { DATAURLS } from './utils/constants';
import { useLoadData } from './utils/useLoadData';

export const useGetCharactersQuery = () =>
  useLoadData<ArrayResults<Character>>(DATAURLS.CHARACTERS);
