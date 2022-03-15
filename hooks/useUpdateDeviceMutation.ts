import { useMutateData } from './utils/useMutateData';
import { DATAURLS } from './utils/constants';

export const useUpdateDeviceMutation = (id?: string) => useMutateData<Device>(DATAURLS.DEVICES, id);
