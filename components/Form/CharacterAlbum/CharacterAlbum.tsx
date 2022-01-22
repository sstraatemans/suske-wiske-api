import { FC } from 'react';
import { useGetListCharactersQuery } from '@hooks/admin/useGetListCharactersQuery';
import { Grid } from '@components/.';
import { LookUp } from '../AutoComplete/LookUp';

type Props = {
  handleInputValue: (name: string, value?: unknown) => void;
  value?: string[];
};

export const CharacterAlbum: FC<Props> = ({ value = [], handleInputValue }) => {
  const { data: characterListData } = useGetListCharactersQuery();

  const characterfindCharacterById = (id: string): Character | undefined =>
    characterListData?.results?.find((character) => character.id === id);

  const handleChange = (id: string) => {
    if (!value || !id) return;

    handleInputValue('characters', [...value, id]);
  };

  return (
    <div>
      <LookUp value={value} options={characterListData?.results} handleInputValue={handleChange} />
      {value.map((id: string) => {
        const character = characterfindCharacterById(id);
        return (
          <Grid key={id} container>
            <Grid item>{character?.name}</Grid>
          </Grid>
        );
      })}
    </div>
  );
};
