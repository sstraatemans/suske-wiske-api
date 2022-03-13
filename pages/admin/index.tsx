import { useGetSeriesQuery } from '@hooks/.';
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
  const { data } = useGetSeriesQuery();
  const classes = useStyles();

  return (
    <AdminLayout>
      <h2>Series</h2>
      <ul>
        {data?.results?.map((serie) => (
          <li key={serie?.id}>
            <Link href={`/admin/series/${serie?.id}`}>
              <a>{serie?.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </AdminLayout>
  );
};

export default Admin;
