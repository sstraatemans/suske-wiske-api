import CheckboxMUI, { CheckboxProps } from '@material-ui/core/Checkbox';
import { FC, FormEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(2),
  },
}));

type Props = CheckboxProps & {
  name: string;
  handleInputValue: (name: string, value: boolean) => void;
};

export const Checkbox: FC<Props> = ({ handleInputValue, name, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <CheckboxMUI {...props} name={name} onChange={(ev, value) => handleInputValue(name, value)} />
    </div>
  );
};
