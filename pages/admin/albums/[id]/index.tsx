import { FormEvent, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useFormControls, useGetAlbumQuery, useImageupload } from '@hooks/.';

import { AdminLayout } from '@layouts/.';
import { TextField, UploadField } from '@components/Form';
import { Button } from '@components/.';
import { Album, Maybe } from '@hooks/graphql';
import { useUpdateAlbumMutation } from '@hooks/.';

const Admin: NextPage = () => {
  const { query } = useRouter();
  const id = (query.id ?? '') as string;
  const { data } = useGetAlbumQuery(id);
  const { uploadImage, progress, selectImage, imageUrl } = useImageupload();
  const { formValues, setInitialFormValues, handleInputValue, handleAddImage } =
    useFormControls<Maybe<Album>>();
  const { updateAlbum } = useUpdateAlbumMutation();

  useEffect(() => {
    setInitialFormValues(data?.album);
  }, [data, setInitialFormValues]);

  useEffect(() => {
    handleAddImage(imageUrl);
  }, [imageUrl, handleAddImage]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('submit');

    if (data?.album?.id) {
      uploadImage(data.album.id);
    }

    console.log({ formValues });
    updateAlbum({ variables: { input: formValues } });
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
          disabled
        />
        <TextField
          label='name'
          name='name'
          value={formValues?.name}
          handleInputValue={handleInputValue}
        />
        <UploadField onChange={selectImage} progress={progress} />
        <Button type='submit'>Submit</Button>
      </form>

      {formValues?.images && <img src={formValues.images[0]} />}
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </AdminLayout>
  );
};

export default Admin;
