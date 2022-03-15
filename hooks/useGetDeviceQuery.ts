import { DATAURLS } from './utils/constants';
import { useLoadData } from './utils/useLoadData';

export const useGetDeviceQuery = (id: string) => useLoadData<Device>(`${DATAURLS.DEVICES}/${id}`);
