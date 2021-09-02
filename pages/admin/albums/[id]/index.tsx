import { useGetAlbumQuery } from '@hooks/graphql';
import { AdminLayout } from '@layouts/.';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Admin: NextPage = () => {
  const { query } = useRouter();
  const id = (query.id ?? '') as string;
  const { loading, error, data } = useGetAlbumQuery({ variables: { id } });

  if (loading || error || !data) return null;

  return (
    <AdminLayout>
      <h2>{query.id}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </AdminLayout>
  );
};

export default Admin;
