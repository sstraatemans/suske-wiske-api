import { useGetCharactersQuery } from '@hooks/.';
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
  const { loading, error, data } = useGetCharactersQuery();
  const classes = useStyles();

  return (
    <AdminLayout>
      <h2>Characters</h2>

      <ul>
        {data?.characters?.map((character) => (
          <li key={character?.id}>
            <Link href={`/admin/characters/${character?.id}`}>
              <a>{character?.name}</a>
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
