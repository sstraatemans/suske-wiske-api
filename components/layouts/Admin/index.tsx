import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { useAuthUser, useDataContext } from '@context/.';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Loader,
  Box,
  FullpageLoader,
} from '@components/.';
import { AccountCircle } from '@icons/.';

type Props = {};

const useStyles = makeStyles({
  spacer: { flexGrow: 1 },
});

const AdminLayout: FC<Props> = ({ children }) => {
  const { signOut, isLoggedIn, isLoading: isUserLoading, user } = useAuthUser();
  const [isMenuOpen, setisMenuOpen] = useState(false);
  const router = useRouter();
  const classes = useStyles();
  const { isLoading, error } = useDataContext();

  useEffect(() => {
    if (!isUserLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoading, isLoggedIn, router]);

  const handleSignOff = () => {
    setisMenuOpen(false);
    signOut();
  };

  if (isUserLoading || !isLoggedIn) return <FullpageLoader />;

  return (
    <>
      <header>
        <AppBar position='static'>
          <Container>
            <Toolbar>
              <Link href='/admin' passHref={true}>
                <Button color='inherit'>Series</Button>
              </Link>
              <Link href='/admin/albums' passHref={true}>
                <Button color='inherit'>Albums</Button>
              </Link>
              <Link href='/admin/characters' passHref={true}>
                <Button color='inherit'>Characters</Button>
              </Link>
              <Link href='/admin/inventions' passHref={true}>
                <Button color='inherit'>Inventions</Button>
              </Link>
              <div className={classes.spacer}></div>

              {user && (
                <div>
                  <IconButton
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={() => setisMenuOpen(true)}
                    color='inherit'
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id='menu-appbar'
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={isMenuOpen}
                    onClose={() => setisMenuOpen(false)}
                  >
                    <MenuItem onClick={handleSignOff}>Signoff</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </header>
      <Container>
        <main>
          {isLoading && (
            <Box p={2} display='flex' justifyContent='center'>
              <Loader />
            </Box>
          )}
          {children}
        </main>
      </Container>
      <footer></footer>
    </>
  );
};

export default AdminLayout;
