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
  mutateData: (body: any) => Promise<any>;
};

export const LookUp: FC<Props> = ({ disabled, handleInputValue, value, options, mutateData }) => {
  const classes = useStyles();
  const { handleChange, handleSelectValue, foundItems, innerSearchValue } = useLookUp({
    value,
    handleInputValue,
    options,
    mutateData,
  });

  return (
    <div className={classes.wrapper}>
      <TextField
        disabled={disabled}
        value={innerSearchValue}
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
