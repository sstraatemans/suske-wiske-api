import { FC } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { SelectOption } from './SelectOption';
import { useLookUp } from './useLookUp';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(2),
  },
}));

type Props = {
  handleInputValue: (name: string, value?: string) => void;
  value: string[];
  options: unknown[] | undefined;
  disabled?: boolean;
};

export const LookUp: FC<Props> = ({ disabled, handleInputValue, value, options }) => {
  const classes = useStyles();
  const { handleChange, handleSelectValue, foundItems } = useLookUp({
    value,
    handleInputValue,
    options,
  });

  return (
    <div className={classes.wrapper}>
      <TextField disabled={disabled} variant='outlined' fullWidth onChange={handleChange} />

      {foundItems.map((option) => (
        <SelectOption key={option.id} option={option} handleSelectValue={handleSelectValue} />
      ))}
    </div>
  );
};
