import { FormEvent, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFormControls, useGetInventionQuery, useImageupload } from '@hooks/.';

import { AdminLayout } from '@layouts/.';
import { TextField, UploadField } from '@components/Form';
import { Button, ImageContainer } from '@components/.';
import { Invention, Maybe } from '@hooks/graphql';
import { useUpdateInventionMutation } from '@hooks/.';

const Admin: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const id = (query.id ?? '') as string;
  const { data } = useGetInventionQuery(id);
  const { uploadImage, progress, selectImage, imageUrl, setImageUrl } = useImageupload();
  const { formValues, setInitialFormValues, handleInputValue, handleAddImage } =
    useFormControls<Maybe<Invention>>();
  const { updateInvention } = useUpdateInventionMutation();

  useEffect(() => {
    setInitialFormValues(data?.invention);
  }, [data, setInitialFormValues]);

  useEffect(() => {
    if (imageUrl) {
      handleAddImage(imageUrl);
      updateInvention({ variables: { input: formValues } });
      setImageUrl(null);
    }
  }, [imageUrl, handleAddImage, setImageUrl, updateInvention, formValues]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (data?.invention?.id) {
      uploadImage(data.invention.id);
    }

    updateInvention({ variables: { input: { ...formValues, images: [] } } });
    router.push(`/admin/inventions/${formValues?.id}`);
  };

  return (
    <AdminLayout>
      <h2>{formValues?.name ? formValues?.name : 'New Invention'}</h2>

      <form onSubmit={handleSubmit}>
        <TextField
          label='id'
          name='id'
          value={formValues?.id}
          handleInputValue={handleInputValue}
          required
        />
        <TextField
          label='name'
          name='name'
          value={formValues?.name}
          handleInputValue={handleInputValue}
          required
        />
        {data?.invention?.id && <UploadField onChange={selectImage} progress={progress} />}
        <Button type='submit'>Submit</Button>
      </form>

      <h3>Image</h3>
      {data?.invention?.images?.length && data.invention.images[0] && (
        <ImageContainer width={300} height={300}>
          <Image src={data.invention.images[0]} layout='fill' alt='invention photo' />
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
