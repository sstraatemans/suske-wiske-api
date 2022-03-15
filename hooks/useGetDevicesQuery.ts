import { DATAURLS } from './utils/constants';
import { useLoadData } from './utils/useLoadData';

export const useGetDevicesQuery = () => useLoadData<ArrayResults<Device>>(DATAURLS.DEVICES);
