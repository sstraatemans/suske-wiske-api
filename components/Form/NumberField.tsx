import TextFieldMUI, { TextFieldProps } from '@material-ui/core/TextField';
import { FC, FormEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(2),
  },
}));

type Props = TextFieldProps & {
  handleInputEvent: (e: FormEvent<Element>) => void;
};

export const NumberField: FC<Props> = ({ handleInputEvent, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <TextFieldMUI
        type='number'
        variant='outlined'
        fullWidth
        {...props}
        onBlur={handleInputEvent}
        onChange={handleInputEvent}
      />
    </div>
  );
};
