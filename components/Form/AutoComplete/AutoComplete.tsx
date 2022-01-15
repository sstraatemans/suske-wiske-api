import { FC } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { SelectOption } from './SelectOption';
import { useAutocomplete } from './useAutocomplete';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(2),
  },
}));

type Props = {
  handleInputValue: (name: string, value?: string) => void;
  label: string;
  name: string;
  value?: string;
  options: unknown[] | undefined;
};

export const AutoComplete: FC<Props> = ({ label, name, handleInputValue, value, options }) => {
  const classes = useStyles();
  const { handleChange, handleSelectValue, innerLabel, foundItems, innerValue } = useAutocomplete({
    value,
    handleInputValue,
    options,
    name,
  });

  return (
    <div className={classes.wrapper}>
      <TextField type='hidden' name={name} value={innerValue} />
      <TextField
        label={label}
        value={innerLabel}
        variant='outlined'
        fullWidth
        onChange={handleChange}
      />

      {foundItems.map((option) => (
        <SelectOption key={option.id} option={option} handleSelectValue={handleSelectValue} />
      ))}
    </div>
  );
};
