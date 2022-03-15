import { FC } from 'react';
import { useGetListDevicesQuery } from '@hooks/admin/useGetListDevicesQuery';
import { Grid, IconButton } from '@components/.';
import { LookUp } from '../AutoComplete/LookUp';
import { useUpdateDeviceMutation } from '@hooks/useUpdateDeviceMutation';
import { DeleteIcon } from '@components/icons';

type Props = {
  handleInputValue: (name: string, value?: unknown) => void;
  value?: string[];
};

export const DeviceAlbum: FC<Props> = ({ value = [], handleInputValue }) => {
  const { data: deviceListData, reload } = useGetListDevicesQuery();
  const { mutateData } = useUpdateDeviceMutation();

  const findDeviceById = (id: string): Device | undefined =>
    deviceListData?.results?.find((device) => device.id === id);

  const handleChange = (id: string) => {
    if (!value || !id) return;
    reload(true);
    handleInputValue('devices', [...value, id]);
  };

  const handleDelete = (id: string) => {
    if (!value || !id) return;
    handleInputValue(
      'devices',
      value.filter((v) => v !== id)
    );
  };

  return (
    <div>
      <LookUp
        value={value}
        options={deviceListData?.results}
        handleInputValue={handleChange}
        mutateData={mutateData}
      />
      {value.map((id: string) => {
        const device = findDeviceById(id);
        if (!device) return null;
        return (
          <Grid key={id} container>
            <Grid item>{device?.name}</Grid>
            <Grid item>
              <IconButton onClick={() => handleDelete(device.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};
