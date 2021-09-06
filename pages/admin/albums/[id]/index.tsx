import { useGetAlbumQuery } from '@hooks/.';
import { AdminLayout } from '@layouts/.';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { TextField } from '@components/Form';
import { Button } from '@components/.';

const Admin: NextPage = () => {
  const { query } = useRouter();
  const id = (query.id ?? '') as string;
  const { data } = useGetAlbumQuery(id);

  const handleSubmit = () => {
    console.log('submit');
  };

  return (
    <AdminLayout>
      <h2>{data?.album ? data.album.name : 'New album'}</h2>

      <form onSubmit={handleSubmit}>
        <TextField value={data?.album?.name} />
        <Button type='submit'>Submit</Button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </AdminLayout>
  );
};

export default Admin;
