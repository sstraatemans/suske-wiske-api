import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import { FC, MutableRefObject } from 'react';
import { Paper, Typography, Button } from '../';

const useStyles = makeStyles((theme) => ({
  rootPaper: {
    display: 'flex',
    alignItems: 'stretch',
  },
  rootInput: {
    flex: 1,
    '& input': {
      padding: `${theme.spacing(1)}px`,
    },
  },
  button: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1),
  },
}));

type Props = {
  inputRef: MutableRefObject<HTMLInputElement | null>;
};

export const RestInput: FC<Props> = ({ inputRef }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.rootPaper}>
      <Paper elevation={0} square className={classes.label}>
        <Typography>{process.env.NEXT_PUBLIC_APIURL}/</Typography>
      </Paper>
      <InputBase className={classes.rootInput} inputRef={inputRef} />
      <Button variant='contained' color='primary' type='submit' className={classes.button}>
        Request
      </Button>
    </Paper>
  );
};
