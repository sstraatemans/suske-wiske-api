import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'relative',
    width: (props) => props.width,
    height: (props) => props.height,
  },
}));

type Props = {
  width: number;
  height: number;
};

export const ImageContainer: FC<Props> = ({ children, ...props }) => {
  const classes = useStyles(props);

  return <div className={classes.wrapper}>{children}</div>;
};
