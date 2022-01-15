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
  console.log(value);
  const classes = useStyles();
  const [innerValue, setInnerValue] = useState<string | undefined>(value);
  const [innerLabel, setInnerLabel] = useState<string>();
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

    setInnerLabel(searchValue);
    setFoundItems(foundArray);
  };

  useEffect(() => {
    if (options) {
      const val = (options as OptionProp[]).find((option) => {
        if (option.id === innerValue) {
          return option.name;
        }
      });
      setInnerLabel(val?.name);
    }
  }, [options, innerValue]);

  const handleSelectValue = (option: OptionProp) => {
    setInnerValue(option.id);

    setFoundItems([]);
  };

  return (
    <div className={classes.wrapper}>
      <input type='hidden' name={name} value={innerValue} />
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

const SelectOption: FC<SelectOptionProp> = ({ option, handleSelectValue }) => {
  return <button onClick={() => handleSelectValue(option)}>{option.name}</button>;
};
