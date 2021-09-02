import { useGetAlbumsQuery } from '@hooks/graphql';
import Link from 'next/link';
import { AdminLayout } from '@layouts/.';
import { NextPage } from 'next';

const Admin: NextPage = () => {
  const { loading, error, data } = useGetAlbumsQuery();

  if (loading || error || !data) return null;

  return (
    <AdminLayout>
      <h2>Albums</h2>

      <ul>
        {data.albums?.map((album) => (
          <li key={album?.id}>
            <Link href={`/admin/albums/${album?.id}`}>
              <a>{album?.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default Admin;
