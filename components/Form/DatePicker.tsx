import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(2),
  },
}));

type Props = {
  handleInputValue?: (date: MaterialUiPickersDate) => void;
  value: Date | null;
  label: string;
  required?: boolean;
  disabled?: boolean;
};

export const DatePicker: FC<Props> = ({
  handleInputValue = () => {},
  value,
  label,
  required,
  disabled,
}) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.wrapper}>
        <KeyboardDatePicker
          variant='dialog'
          format='MM/dd/yyyy'
          value={value}
          label={label}
          disabled={disabled}
          onChange={handleInputValue}
          required={required}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};
