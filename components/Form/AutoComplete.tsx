import { useState, FC, useEffect, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

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

type OptionProp = {
  id: string;
  name: string;
};

type SelectOptionProp = {
  option: OptionProp;
  handleSelectValue: (option: OptionProp) => void;
};

export const AutoComplete: FC<Props> = ({ label, name, handleInputValue, value, options }) => {
  const classes = useStyles();
  const [innerValue, setInnerValue] = useState(value);

  const [foundItems, setFoundItems] = useState<OptionProp[]>([]);

  useEffect(() => {
    handleInputValue(name, innerValue);
  }, [innerValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    if (!searchValue || !options) {
      setFoundItems([]);
      return;
    }

    const foundArray = (options as OptionProp[]).filter((obj) => {
      return obj.name.toLowerCase().includes(searchValue);
    });
    setFoundItems(foundArray);
  };

  const handleSelectValue = (option: OptionProp) => {
    setInnerValue(option.id);

    setFoundItems([]);
  };

  return (
    <div className={classes.wrapper}>
      <input name={name} value={innerValue} />
      <TextField label={label} variant='outlined' fullWidth onChange={handleChange} />

      {foundItems.map((option) => (
        <SelectOption key={option.id} option={option} handleSelectValue={handleSelectValue} />
      ))}
    </div>
  );
};

const SelectOption: FC<SelectOptionProp> = ({ option, handleSelectValue }) => {
  return <button onClick={() => handleSelectValue(option)}>{option.name}</button>;
};
