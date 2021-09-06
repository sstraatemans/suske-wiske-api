import { QueryResult } from '@apollo/client';
import { useDataContext } from '@context/DataContext';
import { useGetAlbumQuery } from '@hooks/.';
import { AdminLayout } from '@layouts/.';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Admin: NextPage = () => {
  const { query } = useRouter();
  const id = (query.id ?? '') as string;
  const { data } = useGetAlbumQuery(id);

  return (
    <AdminLayout>
      <h2>{data?.album ? data.album.name : 'New album'}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </AdminLayout>
  );
};

export default Admin;
