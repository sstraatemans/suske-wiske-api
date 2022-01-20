import { FC, FormEvent, useEffect } from 'react';
import { useFormControls, useImageupload } from '@hooks/.';
import { TextField, UploadField, DatePicker, AutoComplete } from '@components/Form';
import { Button } from '@components/.';
import { useUpdateAlbumMutation } from '@hooks/.';
import { useGetListArtistsQuery } from '@hooks/admin/useGetListArtistsQuery';

type Props = {
  data?: Album;
  handleSubmit: (id?: string) => void;
};

const AlbumForm: FC<Props> = ({ data, handleSubmit }) => {
  const { uploadImage, progress, selectImage, imageUrl, setImageUrl } = useImageupload();
  const { formValues, setInitialFormValues, handleInputEvent, handleAddImage, handleInputValue } =
    useFormControls<Album>();
  const { mutateData, mutateResult } = useUpdateAlbumMutation();
  const { data: artistListData } = useGetListArtistsQuery();

  useEffect(() => {
    setInitialFormValues(data);
  }, [data, setInitialFormValues]);

  useEffect(() => {
    if (mutateResult) {
      handleSubmit(mutateResult.id);
    }
  }, [mutateResult, handleSubmit]);

  useEffect(() => {
    if (imageUrl) {
      handleAddImage(imageUrl);
      setImageUrl(null);
    }
  }, [imageUrl, handleAddImage, setImageUrl, formValues, mutateData]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formValues) return;

    if (formValues?.id) {
      await uploadImage(formValues?.id);
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
        <AutoComplete
          value={formValues?.scenarioArtist}
          label='scenario artist'
          name='scenarioArtist'
          options={artistListData?.results}
          handleInputValue={handleInputValue}
        />
        <AutoComplete
          value={formValues?.drawArtist}
          label='draw artist'
          name='drawArtist'
          options={artistListData?.results}
          handleInputValue={handleInputValue}
        />
        <DatePicker
          value={new Date(formValues?.firstPublicationDate ?? Date.now())}
          label='first publication date'
          handleInputValue={(date) => {
            handleInputValue('firstPublicationDate', date?.getTime());
          }}
        />
        {formValues?.id && <UploadField onChange={selectImage} progress={progress} />}
        <Button type='submit'>Submit</Button>
      </form>

      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </>
  );
};

export default AlbumForm;
