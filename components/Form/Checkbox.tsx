import CheckboxMUI, { CheckboxProps } from '@material-ui/core/Checkbox';
import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(2),
  },
}));

type Props = CheckboxProps & {
  name: string;
  handleInputValue: (name: string, value: boolean) => void;
};

export const Checkbox: FC<Props> = ({ children, handleInputValue, name, ...props }) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <FormControlLabel
        control={
          <CheckboxMUI
            {...props}
            name={name}
            onChange={(ev, value) => handleInputValue(name, value)}
          />
        }
        label={children}
      />
    </div>
  );
};
