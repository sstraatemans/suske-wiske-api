import { useGetAlbums } from '@hooks/useGetAlbums';
import { AdminLayout } from '@layouts/.';
import { NextPage } from 'next';

const Admin: NextPage = () => {
  const { loading, error, data } = useGetAlbums();

  if (loading || error) return null;

  console.log(data);

  return (
    <AdminLayout>
      <h2>Albums</h2>
    </AdminLayout>
  );
};

export default Admin;
