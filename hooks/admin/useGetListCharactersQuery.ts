import { DATAURLS } from '../utils/constants';
import { useLoadData } from '../utils/useLoadData';

export const useGetListCharactersQuery = () =>
  useLoadData<ArrayResults<Character>>(DATAURLS.ADMIN.CHARACTERS);
