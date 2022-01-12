import { useGetArtistsQuery } from '@hooks/.';
import Link from 'next/link';
import { AdminLayout } from '@layouts/.';
import { NextPage } from 'next';

const Admin: NextPage = () => {
  const { data } = useGetArtistsQuery();

  return (
    <AdminLayout>
      <h2>Artists</h2>

      <ul>
        {data?.results?.map((artist) => (
          <li key={artist?.id}>
            <Link href={`/admin/artists/${artist?.id}`}>
              <a>{artist?.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default Admin;
