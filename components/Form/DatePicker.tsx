import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { FC, FormEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(2),
  },
}));

type Props = {
  handleInputValue: (date: MaterialUiPickersDate) => void;
  value: Date;
  label: string;
};

export const DatePicker: FC<Props> = ({ handleInputValue, value, label }) => {
  const classes = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.wrapper}>
        <KeyboardDatePicker
          variant='dialog'
          format='MM/dd/yyyy'
          value={value}
          label={label}
          onChange={handleInputValue}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </div>
    </MuiPickersUtilsProvider>
  );
};
