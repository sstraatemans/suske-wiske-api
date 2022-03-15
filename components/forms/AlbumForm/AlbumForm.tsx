import { FC, FormEvent, useEffect } from 'react';
import { useFormControls } from '@hooks/.';
import {
  TextField,
  DatePicker,
  AutoComplete,
  CharacterAlbum,
  Editor,
  InventionAlbum,
} from '@components/Form';
import { Button, Grid } from '@components/.';
import { useUpdateAlbumMutation } from '@hooks/.';
import { useGetListArtistsQuery } from '@hooks/admin/useGetListArtistsQuery';
import { useGetListInventionsQuery } from '@hooks/admin/useGetListInventionsQuery';
import { Typography } from '@material-ui/core';
import UploadForm from '../UploadForm';

type Props = {
  data?: Album;
  handleSubmit: (id?: string) => void;
};

const AlbumForm: FC<Props> = ({ data, handleSubmit }) => {
  const { formValues, setInitialFormValues, handleInputEvent, handleAddImage, handleInputValue } =
    useFormControls<Album>();
  const { mutateData, mutateResult } = useUpdateAlbumMutation();
  const { data: artistListData } = useGetListArtistsQuery();

  const { data: inventionListData } = useGetListInventionsQuery();

  useEffect(() => {
    setInitialFormValues(data);
  }, [data, setInitialFormValues]);

  useEffect(() => {
    if (mutateResult) {
      handleSubmit(mutateResult.id);
    }
  }, [mutateResult, handleSubmit]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formValues) return;

    if (formValues?.id) {
      await mutateData({ ...formValues });
      return;
    }

    await mutateData({ ...formValues, images: [] });
  };

  if (!formValues && data) return null;
  return (
    <>
      <form onSubmit={onSubmit}>
        <TextField
          label='id'
          name='id'
          value={formValues?.id}
          handleInputEvent={handleInputEvent}
          required
        />
        <TextField
          label='name'
          name='name'
          value={formValues?.name}
          handleInputEvent={handleInputEvent}
          required
        />
        <DatePicker
          value={
            formValues?.firstPublicationDate ? new Date(formValues?.firstPublicationDate) : null
          }
          label='first publication date'
          required
          handleInputValue={(date) => {
            handleInputValue('firstPublicationDate', date?.getTime());
          }}
        />
        <AutoComplete
          value={formValues?.scenarioArtist}
          label='scenario artist'
          name='scenarioArtist'
          options={artistListData?.results}
          handleInputValue={handleInputValue}
        />
        <AutoComplete
          value={formValues?.cartoonArtist}
          label='cartoon artist'
          name='cartoonArtist'
          options={artistListData?.results}
          handleInputValue={handleInputValue}
        />

        <TextField
          label='wikiLink'
          name='wikiLink'
          value={formValues?.wikiLink}
          handleInputEvent={handleInputEvent}
        />
        <Editor
          name='description'
          value={formValues?.description}
          handleInputValue={handleInputValue}
        />

        <Grid container>
          <Grid item xs={6}>
            <Typography variant='h6'>Characters</Typography>
            <CharacterAlbum value={formValues?.characters} handleInputValue={handleInputValue} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant='h6'>Inventions</Typography>
            <InventionAlbum value={formValues?.inventions} handleInputValue={handleInputValue} />
          </Grid>
        </Grid>

        <Button type='submit'>Submit</Button>
      </form>

      {formValues?.id && <UploadForm data={data} label='albums' handleSubmit={handleSubmit} />}

      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </>
  );
};

export default AlbumForm;
