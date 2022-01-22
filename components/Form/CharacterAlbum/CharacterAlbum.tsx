import { FC } from 'react';
import { useGetListCharactersQuery } from '@hooks/admin/useGetListCharactersQuery';
import { Grid, IconButton } from '@components/.';
import { LookUp } from '../AutoComplete/LookUp';
import { useUpdateCharacterMutation } from '@hooks/useUpdateCharacterMutation';
import { DeleteIcon } from '@components/icons';

type Props = {
  handleInputValue: (name: string, value?: unknown) => void;
  value?: string[];
};

export const CharacterAlbum: FC<Props> = ({ value = [], handleInputValue }) => {
  const { data: characterListData, reload } = useGetListCharactersQuery();
  const { mutateData } = useUpdateCharacterMutation();

  const characterfindCharacterById = (id: string): Character | undefined =>
    characterListData?.results?.find((character) => character.id === id);

  const handleChange = (id: string) => {
    if (!value || !id) return;
    reload(true);
    handleInputValue('characters', [...value, id]);
  };

  const handleDelete = (id: string) => {
    if (!value || !id) return;
    handleInputValue(
      'characters',
      value.filter((v) => v !== id)
    );
  };

  return (
    <div>
      <LookUp
        value={value}
        options={characterListData?.results}
        handleInputValue={handleChange}
        mutateData={mutateData}
      />
      {value.map((id: string) => {
        const character = characterfindCharacterById(id);
        if (!character) return null;
        return (
          <Grid key={id} container>
            <Grid item>{character.name}</Grid>
            <Grid item>
              <IconButton onClick={() => handleDelete(character.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
};
