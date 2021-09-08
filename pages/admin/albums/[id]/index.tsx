import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useGetAlbumQuery } from '@hooks/.';
import { uploadFile } from '@client/storage';
import { AdminLayout } from '@layouts/.';
import { TextField, UploadField } from '@components/Form';
import { Button } from '@components/.';
import { useState } from 'react';

const Admin: NextPage = () => {
  const [file, setFile] = useState<File>();
  const [progress, setProgress] = useState<number>(0);
  const { query } = useRouter();
  const id = (query.id ?? '') as string;
  const { data } = useGetAlbumQuery(id);

  const handleSelectImage = (image: File) => {
    setFile(image);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('submit');

    if (file) {
      uploadFile(
        file,
        (progress) => {
          setProgress(progress);
        },
        () => {},
        () => {}
      );
    }
  };

  return (
    <AdminLayout>
      <h2>{data?.album ? data.album.name : 'New album'}</h2>

      <form onSubmit={handleSubmit}>
        <TextField defaultValue={data?.album?.name} />
        <UploadField onChange={handleSelectImage} progress={progress} />
        <Button type='submit'>Submit</Button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </AdminLayout>
  );
};

export default Admin;
