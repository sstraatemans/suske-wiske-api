import { FormEvent, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFormControls, useGetArtistQuery, useImageupload } from '@hooks/.';
import { AdminLayout } from '@layouts/.';
import { TextField, UploadField } from '@components/Form';
import { Button, ImageContainer } from '@components/.';
import { useUpdateArtistMutation } from '@hooks/.';

const Admin: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const id = (query.id ?? '') as string;
  const { data } = useGetArtistQuery(id);
  const { uploadImage, progress, selectImage, imageUrl, setImageUrl } = useImageupload();
  const { formValues, setInitialFormValues, handleInputValue, handleAddImage } =
    useFormControls<Artist>();
  const { mutateData } = useUpdateArtistMutation(id);

  useEffect(() => {
    setInitialFormValues(data);
  }, [data, setInitialFormValues]);

  useEffect(() => {
    if (imageUrl) {
      handleAddImage(imageUrl);
      setImageUrl(null);
    }
  }, [imageUrl, handleAddImage, setImageUrl, formValues, mutateData]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formValues) return;

    if (formValues?.id) {
      await uploadImage(formValues?.id);
      await mutateData({ ...formValues });
      return;
    }

    await mutateData({ ...formValues, images: [] });
  };

  if (!formValues) return null;
  return (
    <AdminLayout>
      <h2>{formValues?.name ? formValues?.name : 'New Artist'}</h2>

      <form onSubmit={handleSubmit}>
        <TextField
          label='name'
          name='name'
          value={formValues?.name}
          handleInputValue={handleInputValue}
          required
        />
        {formValues?.id && <UploadField onChange={selectImage} progress={progress} />}
        <Button type='submit'>Submit</Button>
      </form>

      <h3>Image</h3>
      {formValues?.images?.length && (
        <ImageContainer width={300} height={300}>
          <Image src={formValues.images[0]} layout='fill' alt='artist portrait' />
        </ImageContainer>
      )}

      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

export default Admin;
