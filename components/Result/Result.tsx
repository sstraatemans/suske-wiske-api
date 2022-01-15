import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: `${theme.spacing(1)}px`,
    color: theme.palette.text.secondary,
    overflow: 'hidden',
  },
}));

export const Result: FC = ({ children }) => {
  const classes = useStyles();

  return <pre className={classes.root}>{children}</pre>;
};
