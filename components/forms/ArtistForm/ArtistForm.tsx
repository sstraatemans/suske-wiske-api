import { FC, FormEvent, useEffect } from 'react';
import { DatePicker, Editor, TextField } from '@components/Form';
import { Button } from '@components/.';
import { useUpdateArtistMutation } from '@hooks/.';
import { useFormControls } from '@hooks/.';
import { useRouter } from 'next/router';
import { useGetListAlbumsQuery } from '@hooks/admin/useGetListAlbumsQuery';
import UploadForm from '../UploadForm';

type Props = {
  handleSubmit: (id?: string) => void;
  data?: Artist;
};

const ArtistForm: FC<Props> = ({ handleSubmit, data }) => {
  const router = useRouter();
  const { query } = router;
  const id = (query.id ?? '') as string;
  const { formValues, setInitialFormValues, handleInputEvent, handleInputValue, handleAddImage } =
    useFormControls<Artist>();
  const { data: albumListData } = useGetListAlbumsQuery();
  const { mutateData, mutateResult } = useUpdateArtistMutation(data?.id);

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
          label='name'
          name='name'
          value={formValues?.name}
          handleInputEvent={handleInputEvent}
          required
        />

        <DatePicker
          value={new Date(formValues?.birthDate ?? Date.now())}
          label='birth date'
          handleInputValue={(date) => {
            handleInputValue('birthDate', date?.getTime());
          }}
        />
        <TextField
          label='birthPlace'
          name='birthPlace'
          value={formValues?.birthPlace}
          handleInputEvent={handleInputEvent}
        />
        {data?.debuteAlbum?.id && (
          <TextField
            label='debute album'
            name='debuteAlbum'
            value={`(${data?.debuteAlbum.id}) ${data?.debuteAlbum.name}`}
            handleInputEvent={handleInputEvent}
            disabled
          />
        )}
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
        <Button type='submit'>Submit</Button>
      </form>

      {formValues?.id && <UploadForm data={data} label='artists' handleSubmit={handleSubmit} />}

      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </>
  );
};

export default ArtistForm;
