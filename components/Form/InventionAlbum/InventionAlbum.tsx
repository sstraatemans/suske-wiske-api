import { FC } from 'react';
import { useGetListInventionsQuery } from '@hooks/admin/useGetListInventionsQuery';
import { Grid, IconButton } from '@components/.';
import { LookUp } from '../AutoComplete/LookUp';
import { useUpdateInventionMutation } from '@hooks/useUpdateInventionMutation';
import { DeleteIcon } from '@components/icons';

type Props = {
  handleInputValue: (name: string, value?: unknown) => void;
  value?: string[];
};

export const InventionAlbum: FC<Props> = ({ value = [], handleInputValue }) => {
  const { data: inventionListData, reload } = useGetListInventionsQuery();
  const { mutateData } = useUpdateInventionMutation();

  const findInventionById = (id: string): Invention | undefined =>
    inventionListData?.results?.find((invention) => invention.id === id);

  const handleChange = (id: string) => {
    if (!value || !id) return;
    reload(true);
    handleInputValue('inventions', [...value, id]);
  };

  const handleDelete = (id: string) => {
    if (!value || !id) return;
    handleInputValue(
      'inventions',
      value.filter((v) => v !== id)
    );
  };

  return (
    <div>
      <LookUp
        value={value}
        options={inventionListData?.results}
        handleInputValue={handleChange}
        mutateData={mutateData}
      />
      {value.map((id: string) => {
        const invention = findInventionById(id);
        if (!invention) return null;
        return (
          <Grid key={id} container>
            <Grid item>{invention?.name}</Grid>
            <Grid item>
              <IconButton onClick={() => handleDelete(invention.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};
