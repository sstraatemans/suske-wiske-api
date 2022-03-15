import { useGetDevicesQuery } from '@hooks/.';
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
  const { data } = useGetDevicesQuery();
  const classes = useStyles();

  return (
    <AdminLayout>
      <h2>Devices</h2>

      <ul>
        {data?.results?.map((device) => (
          <li key={device?.id}>
            <Link href={`/admin/devices/${device?.id}`}>
              <a>{device?.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <Link href='/admin/devices/new' passHref={true}>
        <Fab aria-label='Add Device' className={classes.fab} color='primary'>
          <AddIcon />
        </Fab>
      </Link>
    </AdminLayout>
  );
};

export default Admin;
