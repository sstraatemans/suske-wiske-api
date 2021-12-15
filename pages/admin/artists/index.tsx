import { useGetArtistsQuery } from '@hooks/.';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { AdminLayout } from '@layouts/.';
import { NextPage } from 'next';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Admin: NextPage = () => {
  const { loading, error, data } = useGetArtistsQuery();
  const classes = useStyles();

  return (
    <AdminLayout>
      <h2>Artists</h2>

      <ul>
        {data?.artists?.map((artist) => (
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
