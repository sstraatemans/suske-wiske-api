import { useState, ChangeEvent } from 'react';

type Props = {
  handleInputValue: (name: string, value?: string) => void;
  value: string[];
  options: unknown[] | undefined;
};

export const useLookUp = ({ value, handleInputValue, options }: Props) => {
  const [foundItems, setFoundItems] = useState<OptionProp[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.currentTarget.value;
    if (!searchValue || !options) {
      setFoundItems([]);
    } else {
      const foundArray = (options as OptionProp[]).filter((obj) => {
        return obj.name.toLowerCase().includes(searchValue);
      });
      setFoundItems(foundArray);
    }
  };

  const handleSelectValue = (option: OptionProp) => {
    setFoundItems([]);

    // check that the value is not already in the value array
    if (!value.find((v) => v === option.id)) handleInputValue(option.id);
  };

  return {
    handleChange,
    handleSelectValue,
    foundItems,
  };
};
