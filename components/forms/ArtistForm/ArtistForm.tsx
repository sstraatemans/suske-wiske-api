import { FC, FormEvent, useEffect } from 'react';
import { TextField, UploadField } from '@components/Form';
import { Button } from '@components/.';
import { useUpdateArtistMutation } from '@hooks/.';
import { useFormControls, useImageupload } from '@hooks/.';
import { useRouter } from 'next/router';

type Props = {
  handleSubmit: (id?: string) => void;
  data?: Artist;
};

const ArtistForm: FC<Props> = ({ handleSubmit, data }) => {
  const router = useRouter();
  const { query } = router;
  const id = (query.id ?? '') as string;
  const { uploadImage, progress, selectImage, imageUrl, setImageUrl } = useImageupload();
  const { formValues, setInitialFormValues, handleInputEvent, handleAddImage } =
    useFormControls<Artist>();

  const { mutateData, mutateResult } = useUpdateArtistMutation(data?.id);

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
        {formValues?.id && <UploadField onChange={selectImage} progress={progress} />}
        <Button type='submit'>Submit</Button>
      </form>

      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </>
  );
};

export default ArtistForm;
