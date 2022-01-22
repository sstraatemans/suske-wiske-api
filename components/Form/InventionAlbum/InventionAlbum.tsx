import { FC } from 'react';
import { useGetListInventionsQuery } from '@hooks/admin/useGetListInventionsQuery';
import { Grid } from '@components/.';
import { LookUp } from '../AutoComplete/LookUp';

type Props = {
  handleInputValue: (name: string, value?: unknown) => void;
  value?: string[];
};

export const InventionAlbum: FC<Props> = ({ value = [], handleInputValue }) => {
  const { data: inventionListData } = useGetListInventionsQuery();

  const findInventionById = (id: string): Invention | undefined =>
    inventionListData?.results?.find((invention) => invention.id === id);

  const handleChange = (id: string) => {
    if (!value || !id) return;

    handleInputValue('inventions', [...value, id]);
  };

  return (
    <div>
      <LookUp value={value} options={inventionListData?.results} handleInputValue={handleChange} />
      {value.map((id: string) => {
        const character = findInventionById(id);
        return (
          <Grid key={id} container>
            <Grid item>{character?.name}</Grid>
          </Grid>
        );
      })}
    </div>
  );
};
