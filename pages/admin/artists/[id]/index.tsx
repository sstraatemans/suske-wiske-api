import { FormEvent, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFormControls, useGetArtistQuery, useImageupload } from '@hooks/.';

import { AdminLayout } from '@layouts/.';
import { TextField, UploadField } from '@components/Form';
import { Button, ImageContainer } from '@components/.';
import { Artist, Maybe } from '@hooks/graphql';
import { useUpdateArtistMutation } from '@hooks/.';

const Admin: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const id = (query.id ?? '') as string;
  const { data } = useGetArtistQuery(id);
  const { uploadImage, progress, selectImage, imageUrl, setImageUrl } = useImageupload();
  const { formValues, setInitialFormValues, handleInputValue, handleAddImage } =
    useFormControls<Maybe<Artist>>();
  const { updateArtist } = useUpdateArtistMutation();

  useEffect(() => {
    setInitialFormValues(data?.artist);
  }, [data, setInitialFormValues]);

  useEffect(() => {
    if (imageUrl) {
      handleAddImage(imageUrl);
      updateArtist({ variables: { input: formValues } });
      setImageUrl(null);
    }
  }, [imageUrl, handleAddImage, setImageUrl, updateArtist, formValues]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (data?.artist?.id) {
      uploadImage(data.artist.id);
    }

    updateArtist({ variables: { input: { ...formValues, images: [] } } });
    router.push(`/admin/artists/${formValues?.id}`);
  };

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
        {data?.artist?.id && <UploadField onChange={selectImage} progress={progress} />}
        <Button type='submit'>Submit</Button>
      </form>

      <h3>Image</h3>
      {data?.artist?.images?.length && data.artist.images[0] && (
        <ImageContainer width={300} height={300}>
          <Image src={data.artist.images[0]} layout='fill' alt='artist portrait' />
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
