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
  options: { id: string; name: string }[];
  label: string;
  name: string;
  value: string;
};

type OptionProp = {
  id: string;
  name: string;
};

type SelectOptionProp = {
  option: OptionProp;
  handleSelectValue: (option: OptionProp) => void;
};

const options: OptionProp[] = [
  {
    id: '1',
    name: 'test',
  },
  {
    id: '2',
    name: 'nog',
  },
  {
    id: '3',
    name: 'meer',
  },
];

export const AutoComplete: FC<Props> = ({ label, name, handleInputValue, value }) => {
  const classes = useStyles();
  const [innerValue, setInnerValue] = useState(value);
  const [innerEvent, setInnerEvent] = useState();

  const [foundItems, setFoundItems] = useState<OptionProp[]>([]);

  useEffect(() => {
    handleInputValue(name, innerValue);
  }, [innerValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    if (!searchValue) {
      setFoundItems([]);
      return;
    }

    const foundArray = options.filter((obj) => {
      return obj.name.includes(searchValue);
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
