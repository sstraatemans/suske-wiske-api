import { useGetAlbumsQuery } from '@hooks/.';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { AdminLayout } from '@layouts/.';
import { Fab } from '@components/.';
import { AddIcon } from '@icons/.';
import { NextPage } from 'next';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Admin: NextPage = () => {
  const { data } = useGetAlbumsQuery();
  const classes = useStyles();

  return (
    <AdminLayout>
      <h2>Albums</h2>

      <ul>
        {data?.results?.map((album) => (
          <li key={album?.id}>
            <Link href={`/admin/albums/${album?.id}`}>
              <a>{album?.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <Link href='/admin/albums/new' passHref={true}>
        <Fab aria-label='Add album' className={classes.fab} color='primary'>
          <AddIcon />
        </Fab>
      </Link>
    </AdminLayout>
  );
};

export default Admin;
