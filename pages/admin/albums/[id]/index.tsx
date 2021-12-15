import { FormEvent, useEffect } from 'react';
import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFormControls, useGetAlbumQuery, useImageupload } from '@hooks/.';
import { AdminLayout } from '@layouts/.';
import { TextField, UploadField } from '@components/Form';
import { Button, ImageContainer } from '@components/.';
import { Album, Maybe } from '@hooks/graphql';
import { useUpdateAlbumMutation } from '@hooks/.';

const Admin: NextPage = () => {
  const router = useRouter();
  const { query } = router;
  const id = (query.id ?? '') as string;
  const { data } = useGetAlbumQuery(id);
  const { uploadImage, progress, selectImage, imageUrl, setImageUrl } = useImageupload();
  const { formValues, setInitialFormValues, handleInputValue, handleAddImage } =
    useFormControls<Maybe<Album>>();
  const { updateAlbum } = useUpdateAlbumMutation();

  useEffect(() => {
    setInitialFormValues(data?.album);
  }, [data, setInitialFormValues]);

  useEffect(() => {
    if (imageUrl) {
      handleAddImage(imageUrl);
      updateAlbum({ variables: { input: formValues } });
      setImageUrl(null);
    }
  }, [imageUrl, handleAddImage, setImageUrl, updateAlbum, formValues]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (data?.album?.id) {
      uploadImage(data.album.id);
    }

    updateAlbum({ variables: { input: { ...formValues, images: [] } } });
    router.push(`/admin/albums/${formValues?.id}`);
  };

  return (
    <AdminLayout>
      <h2>{formValues?.name ? formValues?.name : 'New album'}</h2>

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
        {data?.album?.id && <UploadField onChange={selectImage} progress={progress} />}
        <Button type='submit'>Submit</Button>
      </form>

      <h3>Image</h3>
      {data?.album?.images?.length && data.album.images[0] && (
        <ImageContainer width={300} height={300}>
          <Image src={data.album.images[0]} layout='fill' alt='album cover' />
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
