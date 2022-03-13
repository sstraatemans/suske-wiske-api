import { FC } from 'react';
import Image from 'next/image';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1000px',
    margin: '0 auto',
    height: '100vh',
    padding: '0 1.5rem',
  },
  main: {
    outline: '1rem solid white',
    border: '2px solid black',
    padding: '1rem',
    margin: '1rem 0',
    flex: 1,
    backgroundColor: 'white',
  },
  header: {},
}));

const PageLayout: FC = ({ children }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <Image
          src='/header.png'
          alt='Suske en Wiske - de alwetende API'
          width={1000}
          height={302}
        />
      </header>

      <main className={classes.main}>{children}</main>

      <footer>footer</footer>
    </div>
  );
};

export default PageLayout;
