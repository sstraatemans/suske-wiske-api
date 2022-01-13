import { FC, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  useFormControls,
  useGetInventionQuery,
  useImageupload,
  useUpdateInventionMutation,
} from '@hooks/.';
import { TextField, UploadField } from '@components/Form';
import { Button, ImageContainer } from '@components/.';

type Props = {
  handleSubmit: (id: string) => void;
  data?: Invention;
};

const InventionForm: FC<Props> = ({ data, handleSubmit }) => {
  const { uploadImage, progress, selectImage, imageUrl, setImageUrl } = useImageupload();
  const { formValues, setInitialFormValues, handleInputEvent, handleAddImage } =
    useFormControls<Invention>();
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
        {formValues?.id && <UploadField onChange={selectImage} progress={progress} />}
        <Button type='submit'>Submit</Button>
      </form>
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </>
  );
};

export default InventionForm;
