import TextFieldMUI, { TextFieldProps } from '@material-ui/core/TextField';
import { FC, FormEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(2),
  },
}));

type Props = TextFieldProps & {
  handleInputValue: (e: FormEvent<Element>) => void;
};

export const TextField: FC<Props> = ({ handleInputValue, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <TextFieldMUI
        variant='outlined'
        fullWidth
        {...props}
        onBlur={handleInputValue}
        onChange={handleInputValue}
      />
    </div>
  );
};
