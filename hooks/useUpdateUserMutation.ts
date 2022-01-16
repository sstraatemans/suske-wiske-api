import { useMutateData } from './utils/useMutateData';
import { DATAURLS } from './utils/constants';

export const useUpdateUserMutation = (id?: string) => useMutateData<User>(DATAURLS.USERS, id);
