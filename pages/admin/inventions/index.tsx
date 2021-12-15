import { useGetInventionsQuery } from '@hooks/.';
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
  const { loading, error, data } = useGetInventionsQuery();
  const classes = useStyles();

  return (
    <AdminLayout>
      <h2>Inventions</h2>

      <ul>
        {data?.inventions?.map((invention) => (
          <li key={invention?.id}>
            <Link href={`/admin/inventions/${invention?.id}`}>
              <a>{invention?.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <Link href='/admin/inventions/new' passHref={true}>
        <Fab aria-label='Add Invention' className={classes.fab} color='primary'>
          <AddIcon />
        </Fab>
      </Link>
    </AdminLayout>
  );
};

export default Admin;
