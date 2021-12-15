import { FC } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';

type Props = {
  width: number;
  height: number;
};

const useStyles = makeStyles<Theme, Props>(() => ({
  wrapper: {
    position: 'relative',
    width: ({ width }) => width,
    height: ({ height }) => height,
  },
}));

export const ImageContainer: FC<Props> = ({ children, ...props }) => {
  const classes = useStyles(props);

  return <div className={classes.wrapper}>{children}</div>;
};
