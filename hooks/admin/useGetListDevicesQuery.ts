import { DATAURLS } from '../utils/constants';
import { useLoadData } from '../utils/useLoadData';

export const useGetListDevicesQuery = () =>
  useLoadData<ArrayResults<Device>>(DATAURLS.ADMIN.DEVICES);
