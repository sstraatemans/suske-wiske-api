import { FC, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  useFormControls,
  useGetInventionQuery,
  useImageupload,
  useUpdateInventionMutation,
} from '@hooks/.';
import { AutoComplete, Editor, TextField, UploadField, DatePicker } from '@components/Form';
import { Button, ImageContainer } from '@components/.';
import { useGetListAlbumsQuery } from '@hooks/admin/useGetListAlbumsQuery';

type Props = {
  handleSubmit: (id: string) => void;
  data?: Invention;
};

const InventionForm: FC<Props> = ({ data, handleSubmit }) => {
  const { uploadImage, progress, selectImage, imageUrl, setImageUrl } = useImageupload();
  const { formValues, setInitialFormValues, handleInputEvent, handleInputValue, handleAddImage } =
    useFormControls<Invention>();
  const { data: albumListData } = useGetListAlbumsQuery();
  const { mutateData, mutateResult } = useUpdateInventionMutation(data?.id);

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
          label='name'
          name='name'
          value={formValues?.name}
          handleInputEvent={handleInputEvent}
          required
        />
        {data?.debuteAlbum?.id && (
          <>
            {' '}
            <TextField
              label='debute album'
              name='debuteAlbum'
              value={`(${data?.debuteAlbum.id}) ${data?.debuteAlbum.name}`}
              handleInputEvent={handleInputEvent}
              disabled
            />
            <DatePicker
              value={data?.debuteDate ? new Date(data?.debuteDate) : null}
              label='debute date'
              required
              disabled
            />
          </>
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
        {formValues?.id && <UploadField onChange={selectImage} progress={progress} />}
        <Button type='submit'>Submit</Button>
      </form>
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </>
  );
};

export default InventionForm;
