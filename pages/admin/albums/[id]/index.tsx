import { FormEvent, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useFormControls, useGetAlbumQuery, useImageupload } from '@hooks/.';

import { AdminLayout } from '@layouts/.';
import { TextField, UploadField } from '@components/Form';
import { Button } from '@components/.';
import { Album, Maybe } from '@hooks/graphql';

const Admin: NextPage = () => {
  const { query } = useRouter();
  const id = (query.id ?? '') as string;
  const { data } = useGetAlbumQuery(id);
  const { uploadImage, progress, selectImage, imageUrl } = useImageupload();
  const { formValues, setInitialFormValues, handleInputValue } = useFormControls<Maybe<Album>>();

  useEffect(() => {
    setInitialFormValues(data?.album);
  }, [data]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('submit');

    if (data?.album?.id) {
      uploadImage(data.album.id);
    }
  };

  return (
    <AdminLayout>
      <h2>{data?.album ? data.album.name : 'New album'}</h2>

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
      {imageUrl}
      <pre>{JSON.stringify(formValues, null, 2)}</pre>
    </AdminLayout>
  );
};

export default Admin;
